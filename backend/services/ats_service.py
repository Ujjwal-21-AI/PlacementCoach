import json
from services.gemini_service import client


def analyze_resume_against_jd(resume_text: str, job_description: str):

    prompt = f"""
You are an expert ATS (Applicant Tracking System).

Compare the following resume with the job description.

Return ONLY valid JSON.

Format:

{{
    "ats_score": 85,

    "matched_skills": [
        "Python",
        "FastAPI",
        "SQL"
    ],

    "missing_skills": [
        "Docker",
        "AWS",
        "CI/CD"
    ],

    "strengths": [
        "Strong backend experience",
        "Relevant AI projects"
    ],

    "suggestions": [
        "Mention Docker experience",
        "Add cloud deployment project",
        "Highlight REST API development"
    ]
}}

Resume:

{resume_text}

Job Description:

{job_description}

Return ONLY JSON.
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

        print("ATS Error:", e)

        return {
            "ats_score": 70,
            "matched_skills": [],
            "missing_skills": [],
            "strengths": [],
            "suggestions": [
                "AI analysis failed. Please try again."
            ]
        }