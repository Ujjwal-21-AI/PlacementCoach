import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def analyze_resume_with_gemini(resume_text: str):

    prompt = f"""
You are an expert ATS Resume Reviewer.

Analyze the resume and return ONLY valid JSON.

Format:

{{
    "score": 85,
    "strengths": [
        "strength1",
        "strength2",
        "strength3"
    ],
    "improvements": [
        "improvement1",
        "improvement2",
        "improvement3"
    ],
    "summary": "short summary"
}}

Resume:
{resume_text}

Return ONLY JSON.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()

    return json.loads(text)