import json
import re

from services.gemini_service import client


def extract_json(text: str):
    """
    Extract valid JSON from Gemini response.
    """

    text = text.strip()

    text = re.sub(r"^```json", "", text)
    text = re.sub(r"^```", "", text)
    text = re.sub(r"```$", "", text)

    start = text.find("{")
    end = text.rfind("}")

    if start != -1 and end != -1:
        text = text[start:end + 1]

    return json.loads(text)


def generate_interview_questions(role: str):

    prompt = f"""
Generate exactly 5 interview questions for a {role} role.

Return ONLY valid JSON.

Format:

{{
    "questions":[
        "...",
        "...",
        "...",
        "...",
        "..."
    ]
}}
"""

    try:

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return extract_json(response.text)

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

Role:
{role}

Question:
{question}

Candidate Answer:
{answer}

Return ONLY valid JSON.

Format:

{{
    "score":85,
    "strengths":[
        "...",
        "..."
    ],
    "improvements":[
        "...",
        "..."
    ],
    "better_answer":"..."
}}
"""

    try:

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return extract_json(response.text)

    except Exception as e:

        print("Gemini Feedback Error:", e)

        return {

            "score": 70,

            "strengths": [
                "Attempted the question."
            ],

            "improvements": [
                "Use more technical details.",
                "Support your answer with a real example."
            ],

            "better_answer":
                "Use the STAR method (Situation, Task, Action, Result) and include measurable impact."

        }