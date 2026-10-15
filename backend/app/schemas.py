
from pydantic import BaseModel, ConfigDict


class StudentCreate(BaseModel):
    full_name: str | None = None
    education_level: str | None = None
    interests: str | None = None
    skills: str | None = None
    career_goals: str | None = None
    preferred_location: str | None = None


class StudentResponse(StudentCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)
