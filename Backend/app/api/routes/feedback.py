from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from collections import defaultdict
import openai
import os
from dotenv import load_dotenv

from app.api.deps import get_db, get_current_user
from app.db.models.user import User
from app.db.models.evaluation import Evaluation
from app.db.models.question import Question
from app.db.models.seller import Seller

router = APIRouter()

# Cargar clave desde .env
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

@router.get("/feedback/{seller_id}")
def generate_feedback(seller_id: int, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    evaluations = db.query(Evaluation).filter(Evaluation.seller_id == seller_id).all()

    if not evaluations:
        return {"detail": "No evaluations found for this seller."}

    stage_scores = defaultdict(list)
    observations = []

    for ev in evaluations:
        if ev.observation:
            observations.append(ev.observation)

        for ans in ev.answers:
            question = db.query(Question).get(ans.question_id)
            stage_scores[question.stage].append(ans.value)

    summary_stages = "\n".join([
        f"- {stage}: {round(sum(vals)/len(vals), 2)}"
        for stage, vals in stage_scores.items()
    ])
    summary_obs = "\n".join([f'- "{o}"' for o in observations if o])

    prompt = f"""
Sales performance summary by stage:
{summary_stages}

Interview observations:
{summary_obs}

Please analyze the seller's performance and suggest 3 practical improvement recommendations.
"""

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an expert sales trainer and evaluator."},
            {"role": "user", "content": prompt}
        ]
    )

    feedback = response.choices[0].message.content
    return {"seller_id": seller_id, "feedback": feedback}
