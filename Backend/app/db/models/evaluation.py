from sqlalchemy import Column, Integer, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship
from app.db.session import Base
from datetime import datetime

class Evaluation(Base):
    __tablename__ = "evaluations"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    seller_id = Column(Integer, ForeignKey("sellers.id"))
    observation = Column(String, nullable=True)
    date = Column(DateTime, default=datetime.utcnow)

    answers = relationship("Answer", back_populates="evaluation")


class Answer(Base):
    __tablename__ = "answers"
    id = Column(Integer, primary_key=True, index=True)
    evaluation_id = Column(Integer, ForeignKey("evaluations.id"))
    answer_id = Column(Integer, ForeignKey("answers.id"))
    valor = Column(Integer)
    question_id = Column(Integer)  # o ForeignKey si tienes tabla de preguntas

    evaluation = relationship("Evaluation", back_populates="answers")
