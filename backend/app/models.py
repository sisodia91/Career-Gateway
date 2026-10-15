
from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, Text
from app.database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(Text, nullable=True)
    education_level = Column(Text, nullable=True)
    interests = Column(Text, nullable=True)
    skills = Column(Text, nullable=True)
    career_goals = Column(Text, nullable=True)
    preferred_location = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
