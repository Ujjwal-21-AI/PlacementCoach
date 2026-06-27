from sqlalchemy import Column, Integer, String, Text
from database import Base
from sqlalchemy import DateTime
from datetime import datetime


class ResumeAnalysis(Base):
    __tablename__ = "resume_analysis"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    score = Column(Integer, nullable=False)
    strengths = Column(Text, nullable=False)
    improvements = Column(Text, nullable=False)
    summary = Column(Text, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


class InterviewHistory(Base):
    __tablename__ = "interview_history"

    id = Column(Integer, primary_key=True, index=True)

    role = Column(String, nullable=False)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)

    score = Column(Integer, nullable=False)

    strengths = Column(Text, nullable=False)
    improvements = Column(Text, nullable=False)

    better_answer = Column(Text, nullable=False)

class ATSHistory(Base):
    __tablename__ = "ats_history"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String, nullable=False)

    ats_score = Column(Integer, nullable=False)

    matched_skills = Column(Text, nullable=False)
    missing_skills = Column(Text, nullable=False)

    strengths = Column(Text, nullable=False)
    suggestions = Column(Text, nullable=False)