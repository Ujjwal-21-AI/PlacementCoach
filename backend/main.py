import re
from io import BytesIO
from typing import List

import fitz  # PyMuPDF
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import Base, SessionLocal, engine
from models import ResumeAnalysis

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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
async def analyze_resume(file: UploadFile = File(...)):
    content = await file.read()

    if file.filename.lower().endswith(".pdf"):
        resume_text = extract_text_from_pdf(content)
    else:
        resume_text = content.decode("utf-8", errors="ignore")
        resume_text = re.sub(r"[ \t]+", " ", resume_text).strip()

    text_lower = resume_text.lower()

    strengths: List[str] = []
    improvements: List[str] = []

    if "project" in text_lower:
        strengths.append("Projects are mentioned in the resume")
    else:
        improvements.append("Add a clear project section")

    if any(skill in text_lower for skill in ["python", "java", "javascript", "c++", "sql"]):
        strengths.append("Programming skills are visible")
    else:
        improvements.append("Add your core programming languages")

    if any(word in text_lower for word in ["built", "developed", "created", "implemented"]):
        strengths.append("Resume includes action-oriented language")
    else:
        improvements.append("Use stronger action verbs in bullet points")

    if len(resume_text) < 500:
        improvements.append("Resume content looks too short or incomplete")

    score = 70 + min(len(strengths) * 5, 15) - min(len(improvements) * 3, 15)
    score = max(40, min(score, 95))

    if not strengths:
        strengths = ["Resume was received successfully"]
    if not improvements:
        improvements = ["Add more measurable impact to make it stronger"]

    summary = (
        "Your resume is a good starting point, but it will become stronger "
        "if you add measurable impact, role-specific keywords, and clearer project details."
    )

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
    role_questions = {
        "SDE": [
            "Tell me about a project where you solved a difficult problem.",
            "Explain the difference between Array and Linked List.",
            "How would you optimize a slow web application?",
        ],
        "ML Engineer": [
            "Tell me about an ML project you worked on.",
            "What is overfitting and how do you handle it?",
            "Explain the difference between classification and regression.",
        ],
        "Data Analyst": [
            "Tell me about a dashboard or analysis project you built.",
            "How do you clean messy data?",
            "What is the difference between correlation and causation?",
        ],
        "Web Developer": [
            "Tell me about a website or app you built.",
            "What is the difference between frontend and backend?",
            "How do you make a web app responsive?",
        ],
    }

    questions = role_questions.get(req.role, role_questions["SDE"])
    return {"role": req.role, "questions": questions}


@app.post("/evaluate-answer")
def evaluate_answer(req: AnswerRequest):
    words = req.answer.strip().split()
    length = len(words)

    if length < 20:
        feedback = (
            "Your answer is too short. Use structure: intro → explanation → example → conclusion."
        )
        score = 55
    elif length < 50:
        feedback = "Good start. Add one real example and a stronger closing summary."
        score = 75
    else:
        feedback = "Strong answer. It is detailed and well-structured. Keep it concise and confident."
        score = 90

    return {
        "role": req.role,
        "question": req.question,
        "score": score,
        "feedback": feedback,
    }


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