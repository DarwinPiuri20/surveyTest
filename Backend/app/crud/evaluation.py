from sqlalchemy.orm import Session
from app.db.models.evaluation import Evaluation, Answer

def create_evaluation(db: Session, user_id: int, seller_id: int, observation: str, answer: list):
    evaluation = Evaluation(user_id=user_id, seller_id=seller_id, observation=observation)
    db.add(evaluation)
    db.commit()
    db.refresh(evaluation)

    for r in answer:
        nueva = Answer(evaluation_id=evaluation.id, question_id=r["questionId"], valor=r["valor"])
        db.add(nueva)
    db.commit()
    return evaluation
