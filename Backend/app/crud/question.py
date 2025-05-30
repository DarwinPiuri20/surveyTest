from sqlalchemy.orm import Session
from app.db.models.question import Question

def get_questions(db: Session):
    return db.query(Question).all()

def create_question(db: Session, text: str, stage: str):
    question = Question(text=text, stage=stage)
    db.add(question)
    db.commit()
    db.refresh(question)
    return question
