from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from collections import defaultdict
import openai
import os
from dotenv import load_dotenv
from fastapi.responses import FileResponse
from fpdf import FPDF
import tempfile


from app.api.deps import get_db, get_current_user
from app.db.models.user import User
from app.db.models.evaluation import Evaluation
from app.db.models.question import Question
from app.db.models.feedback import Feedback
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
    nuevo = Feedback(
        seller_id=seller_id,
        user_id=user.id,
        content=feedback
    )
    db.add(nuevo)
    db.commit()

    return {"seller_id": seller_id, "feedback": feedback}


@router.get("/feedback/history/{seller_id}")
def history_feedback(seller_id: int, db: Session = Depends(get_db)):
    registers = db.query(Feedback).filter(Feedback.seller_id == seller_id).order_by(Feedback.date.desc()).all()
    return [{"date": fb.date, "content": fb.content} for fb in registers]


@router.get("/feedback/pdf/{seller_id}")
def export_feedback_pdf(seller_id: int, db: Session = Depends(get_db)):
    from app.db.models.feedback import Feedback
    records = db.query(Feedback).filter(Feedback.seller_id == seller_id).order_by(Feedback.date.desc()).all()

    if not records:
        return {"detail": "No feedback available for export."}

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt=f"Feedback History - Seller {seller_id}", ln=True, align="C")
    pdf.ln(10)

    for fb in records:
        date = fb.date.strftime("%Y-%m-%d %H:%M")
        pdf.multi_cell(0, 10, f"{date}:\n{fb.content}\n\n")

    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
    pdf.output(temp_file.name)

    return FileResponse(temp_file.name, media_type="application/pdf", filename=f"feedback_seller_{seller_id}.pdf")

@router.get("/feedback/history/{seller_id}")
def feedback_history(seller_id: int, db: Session = Depends(get_db)):
    from app.db.models.feedback import Feedback
    registers = db.query(Feedback).filter(Feedback.seller_id == seller_id).order_by(Feedback.date.desc()).all()

    if not registers:
        return {"detail": "No feedback found for this seller."}

    return [
        {
            "date": fb.date.strftime("%Y-%m-%d %H:%M"),
            "content": fb.content
        } for fb in registers
    ]