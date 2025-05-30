from sqlalchemy import Column, Integer, String
from app.db.session import Base

class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    stage = Column(String, nullable=False)  # ejemplo: 'Producto', 'Cierre', etc.
