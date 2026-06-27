import re
from io import BytesIO
from typing import List

import fitz  # PyMuPDF
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from services.ats_service import analyze_resume_against_jd

from database import Base, SessionLocal, engine
from models import (
    ResumeAnalysis,
    InterviewHistory,
    ATSHistory
)
from services.resume_analyzer import analyze_resume
from services.interview_service import (
    generate_interview_questions,
    evaluate_interview_answer
)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "PlacementCoach Backend Running"}


def extract_text_from_pdf(content: bytes) -> str:
    """Extract readable text from a PDF using PyMuPDF."""
    text_parts = []
    doc = fitz.open(stream=content, filetype="pdf")

    for page in doc:
        page_text = page.get_text("text")
        text_parts.append(page_text)

    raw_text = "\n".join(text_parts)
    raw_text = raw_text.replace("\r", "\n")
    raw_text = re.sub(r"[ \t]+", " ", raw_text)
    raw_text = re.sub(r"\n{3,}", "\n\n", raw_text)

    return raw_text.strip()


@app.post("/analyze-resume")
async def analyze_resume_endpoint(file: UploadFile = File(...)):
    content = await file.read()

    if file.filename.lower().endswith(".pdf"):
        resume_text = extract_text_from_pdf(content)
    else:
        resume_text = content.decode("utf-8", errors="ignore")
        resume_text = re.sub(r"[ \t]+", " ", resume_text).strip()

    try:
        ai_result = analyze_resume(resume_text)

        score = ai_result.get("score", 70)
        strengths = ai_result.get(
            "strengths",
            ["Resume analyzed successfully"]
        )
        improvements = ai_result.get(
            "improvements",
            ["No improvement suggestions available"]
        )
        summary = ai_result.get(
            "summary",
            "Resume analyzed successfully"
        )

    except Exception as e:
        print("Gemini Error:", e)

        score = 70
        strengths = ["Resume uploaded successfully"]
        improvements = ["AI analysis failed. Please try again."]
        summary = "Fallback analysis used."

    db: Session = SessionLocal()

    try:
        record = ResumeAnalysis(
            filename=file.filename,
            score=score,
            strengths=", ".join(strengths),
            improvements=", ".join(improvements),
            summary=summary,
        )

        db.add(record)
        db.commit()
        db.refresh(record)

    finally:
        db.close()

    return {
        "filename": file.filename,
        "score": score,
        "strengths": strengths,
        "improvements": improvements,
        "summary": summary,
        "preview": resume_text[:2000],
    }


class InterviewRequest(BaseModel):
    role: str


class AnswerRequest(BaseModel):
    role: str
    question: str
    answer: str


@app.post("/generate-questions")
def generate_questions(req: InterviewRequest):

    result = generate_interview_questions(
        req.role
    )

    return {
        "role": req.role,
        "questions": result["questions"]
    }


@app.post("/evaluate-answer")
def evaluate_answer(req: AnswerRequest):

    result = evaluate_interview_answer(
        req.role,
        req.question,
        req.answer
    )

    db: Session = SessionLocal()

    try:
        history = InterviewHistory(
            role=req.role,
            question=req.question,
            answer=req.answer,
            score=result["score"],
            strengths=", ".join(result["strengths"]),
            improvements=", ".join(result["improvements"]),
            better_answer=result["better_answer"]
        )

        db.add(history)
        db.commit()

    finally:
        db.close()

    return result


@app.get("/resume-history")
def resume_history():
    db: Session = SessionLocal()
    try:
        records = db.query(ResumeAnalysis).order_by(ResumeAnalysis.id.desc()).all()

        result = []
        for item in records:
            result.append(
    {
        "id": item.id,
        "filename": item.filename,
        "score": item.score,
        "strengths": item.strengths,
        "improvements": item.improvements,
        "summary": item.summary,
        "created_at": item.created_at,
    }
)
        return result
    finally:
        db.close()

@app.get("/interview-history")
def interview_history():

    db: Session = SessionLocal()

    try:
        records = (
            db.query(InterviewHistory)
            .order_by(InterviewHistory.id.desc())
            .all()
        )

        result = []

        for item in records:
            result.append({
                "id": item.id,
                "role": item.role,
                "question": item.question,
                "answer": item.answer,
                "score": item.score,
                "strengths": item.strengths,
                "improvements": item.improvements,
                "better_answer": item.better_answer
            })

        return result

    finally:
        db.close()
@app.get("/dashboard")
def dashboard():
    db: Session = SessionLocal()

    try:
        resume_records = db.query(ResumeAnalysis).all()
        interview_records = db.query(InterviewHistory).all()
        ats_records = db.query(ATSHistory).all()

        # Resume Analytics
        if resume_records:
            latest_resume = (
                db.query(ResumeAnalysis)
                .order_by(ResumeAnalysis.id.desc())
                .first()
            )

            average_resume = (
                sum(r.score for r in resume_records)
                / len(resume_records)
            )
        else:
            latest_resume = None
            average_resume = 0

        # Interview Analytics
        if interview_records:
            latest_interview = (
                db.query(InterviewHistory)
                .order_by(InterviewHistory.id.desc())
                .first()
            )

            average_interview = (
                sum(i.score for i in interview_records)
                / len(interview_records)
            )

            highest_interview = max(
                i.score for i in interview_records
            )
        else:
            latest_interview = None
            average_interview = 0
            highest_interview = 0

        return {

    # Resume

    "total_resumes": len(resume_records),

    "latest_resume_score": latest_resume.score if latest_resume else 0,

    "average_resume_score": round(average_resume, 1),

    # Interview

    "total_interviews": len(interview_records),

    "latest_interview_score": latest_interview.score if latest_interview else 0,

    "average_interview_score": round(average_interview, 1),

    "highest_interview_score": highest_interview,

    # ATS

    "total_ats": len(ats_records),

    "latest_ats_score":
        ats_records[-1].ats_score if ats_records else 0,

    "average_ats_score":
        round(
            sum(a.ats_score for a in ats_records) /
            len(ats_records),
            1
        ) if ats_records else 0,

}

    finally:
        db.close()

from fastapi import Form

@app.post("/ats-match")
async def ats_match(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):

    content = await file.read()

    if file.filename.lower().endswith(".pdf"):
        resume_text = extract_text_from_pdf(content)
    else:
        resume_text = content.decode(
            "utf-8",
            errors="ignore"
        )

    try:

        result = analyze_resume_against_jd(
            resume_text,
            job_description
        )

        db: Session = SessionLocal()

        try:

            history = ATSHistory(
                filename=file.filename,
                ats_score=result["ats_score"],
                matched_skills=", ".join(result["matched_skills"]),
                missing_skills=", ".join(result["missing_skills"]),
                strengths=", ".join(result["strengths"]),
                suggestions=", ".join(result["suggestions"])
            )

            db.add(history)
            db.commit()

        finally:
            db.close()

        return result

    except Exception as e:

        print("ATS Error:", e)

        return {
            "ats_score": 70,
            "matched_skills": [],
            "missing_skills": [],
            "strengths": [],
            "suggestions": [
                "AI analysis failed."
            ]
        }

@app.get("/ats-history")
def ats_history():

    db: Session = SessionLocal()

    try:

        records = (
            db.query(ATSHistory)
            .order_by(ATSHistory.id.desc())
            .all()
        )

        result = []

        for item in records:

            result.append({

                "id": item.id,

                "filename": item.filename,

                "ats_score": item.ats_score,

                "matched_skills": item.matched_skills,

                "missing_skills": item.missing_skills,

                "strengths": item.strengths,

                "suggestions": item.suggestions

            })

        return result

    finally:
        db.close()