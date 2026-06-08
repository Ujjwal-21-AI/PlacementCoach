import json
from services.gemini_service import client


def generate_interview_questions(role: str):

    prompt = f"""
Generate 5 interview questions for a {role} role.

Return ONLY valid JSON.

Format:

{{
    "questions": [
        "question1",
        "question2",
        "question3",
        "question4",
        "question5"
    ]
}}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        text = response.text.strip()

        if text.startswith("```json"):
            text = text.replace("```json", "").replace("```", "").strip()

        return json.loads(text)

    except Exception as e:
        print("Gemini Question Error:", e)

        return {
            "questions": [
                f"Tell me about yourself as a {role}.",
                "What are your strengths?",
                "Describe a challenging project.",
                "Why should we hire you?",
                "Where do you see yourself in 5 years?"
            ]
        }


def evaluate_interview_answer(
    role: str,
    question: str,
    answer: str
):

    prompt = f"""
You are an expert technical interviewer.

Role: {role}

Question:
{question}

Candidate Answer:
{answer}

Return ONLY valid JSON.

Format:

{{
    "score": 85,
    "strengths": [
        "strength1",
        "strength2"
    ],
    "improvements": [
        "improvement1",
        "improvement2"
    ],
    "better_answer": "improved answer"
}}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        text = response.text.strip()

        if text.startswith("```json"):
            text = text.replace("```json", "").replace("```", "").strip()

        return json.loads(text)

    except Exception as e:
        print("Gemini Feedback Error:", e)

        return {
            "score": 70,
            "strengths": [
                "Attempted the question"
            ],
            "improvements": [
                "Add more details",
                "Use examples"
            ],
            "better_answer": answer
        }