from sqlalchemy import Column, Integer, String, Text
from database import Base


class ResumeAnalysis(Base):
    __tablename__ = "resume_analysis"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    score = Column(Integer, nullable=False)
    strengths = Column(Text, nullable=False)
    improvements = Column(Text, nullable=False)
    summary = Column(Text, nullable=False)


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