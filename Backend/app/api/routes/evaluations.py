from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.crud.evaluation import create_evaluation
from app.schemas.evaluation import CreateEvaluation

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/evaluations")
def register_evaluation(evaluation: CreateEvaluation, db: Session = Depends(get_db)):
    return create_evaluation(
        db,
        user_id=1,  # Temporal, luego se obtiene desde el token JWT
        seller_id=evaluation.vendedorId,
        observation=evaluation.observacion,
        answer=evaluation.respuestas
    )
