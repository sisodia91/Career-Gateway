
import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from pydantic import BaseModel
from pathlib import Path
from sqlalchemy import text
from app.database import engine
from fastapi import FastAPI, HTTPException, Depends
from fastapi import Depends
from sqlalchemy.orm import Session
from app.database import engine, get_db
from app.models import Student
from app.schemas import StudentCreate, StudentResponse
from sqlalchemy import text
from app.database import engine, Base
from app import models

from app.rag import answer_with_rag


load_dotenv(dotenv_path=Path(__file__).resolve().parents[1] / ".env")

app = FastAPI(title="Career Gateway API")
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://career-gateway-frontend-vzui.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


api_key = os.getenv("GROQ_API_KEY")
model_name = os.getenv("GROQ_MODEL")

client = Groq(api_key=api_key) if api_key else None


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str


@app.get("/")
def home():
    return {"message": "Career Gateway API is running"}


@app.get("/health")
def health():
    return {
        "api": "running",
        "groq_configured": client is not None,
        "model_configured": bool(model_name),
    }
@app.get("/db-health")
def db_health():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "database": "connected",
            "status": "healthy"
        }


    except Exception as exc:
        print(f"Database connection failed: {exc}")
        raise HTTPException(
            status_code=503,
            detail="Database connection failed."
        )

@app.post("/students", response_model=StudentResponse)
def create_student(
    student_data: StudentCreate,
    db: Session = Depends(get_db),
):
    student = Student(**student_data.model_dump())
    db.add(student)
    db.commit()
    db.refresh(student)
    return student


@app.get("/students", response_model=list[StudentResponse])
def get_students(db: Session = Depends(get_db)):
    return db.query(Student).order_by(Student.id.desc()).all()




@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    if not client:
        raise HTTPException(
            status_code=500,
            detail="GROQ_API_KEY is missing from the backend environment.",
        )

    if not model_name:
        raise HTTPException(
            status_code=500,
            detail="GROQ_MODEL is missing from the backend environment.",
        )

    message = request.message.strip()
    normalized_message = message.lower().strip(" .,!?:;")

    # Handle simple greetings without calling RAG
    greetings = {
        "hi",
        "hello",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",
        "hi there",
        "hello there",
        "hey there",
    }

    if normalized_message in greetings:
        return {
            "reply": (
                "Hello! 👋 Welcome to Career Gateway. "
                "I'm your AI career guide. I can help you explore "
                "career paths, courses, skills, internships, and career planning. "
                "What would you like help with today?"
            )
        }

    try:
        reply = answer_with_rag(
            message,
            client,
            model_name
        )
        return {"reply": reply}

    except Exception as exc:
        print(f"RAG chat request failed: {exc}")
        raise HTTPException(
            status_code=502,
            detail="The AI service could not complete your request. Please try again."
        )



@app.post("/students/{student_id}/recommendations")
def get_career_recommendations(
    student_id: int,
    db: Session = Depends(get_db)
):
    # 1. Find the saved student profile
    student = (
        db.query(Student)
        .filter(Student.id == student_id)
        .first()
    )

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student profile not found."
        )

    if not client or not model_name:
        raise HTTPException(
            status_code=500,
            detail="AI service is not configured."
        )

    # 2. Prepare the student's information
    profile = f"""
    Name: {student.full_name or 'Not provided'}
    Education: {student.education_level or 'Not provided'}
    Interests: {student.interests or 'Not provided'}
    Skills: {student.skills or 'Not provided'}
    Career Goals: {student.career_goals or 'Not provided'}
    Preferred Location: {student.preferred_location or 'Not provided'}
    """

    # 3. Ask the AI for personalized guidance
    try:
        response = client.chat.completions.create(
            model=model_name,
            max_tokens=700,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are Career Gateway, a helpful career counsellor. "
                        "Use the student's profile to suggest 3 suitable career "
                        "paths. Explain why each may fit, the skills to learn, "
                        "and a practical first step. Be realistic, use simple "
                        "language, and do not guarantee jobs or outcomes. "
                        "If information is missing, state your assumptions."
                    )
                },
                {
                    "role": "user",
                    "content": (
                        "Recommend career paths based on this saved profile:\n"
                        + profile
                    )
                }
            ]
        )

        recommendation = response.choices[0].message.content

        return {
            "student_id": student.id,
            "student_name": student.full_name,
            "recommendations": recommendation
        }

    except Exception as exc:
        print(f"Career recommendation failed: {exc}")
        raise HTTPException(
            status_code=502,
            detail="Could not generate career recommendations."
        )
