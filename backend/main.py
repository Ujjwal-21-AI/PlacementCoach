import re
from io import BytesIO
from typing import List

import fitz  # PyMuPDF
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import Base, SessionLocal, engine
from models import ResumeAnalysis, InterviewHistory
from services.resume_analyzer import analyze_resume
from services.interview_service import (
    generate_interview_questions,
    evaluate_interview_answer
)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
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