from services.gemini_service import analyze_resume_with_gemini

result = analyze_resume_with_gemini("""
Python Developer

Projects:
Built a machine learning project using Python and Scikit-Learn.
""")

print(result)