from pydantic import BaseModel
from datetime import date

class CreateEvaluation(BaseModel):
    date: date
    evaluator_id: int
    seller_id: int
    score_total: float
    classification: str
