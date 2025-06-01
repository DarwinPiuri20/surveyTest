from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime
from collections import defaultdict

from app.api.deps import get_db, get_current_user
from app.db.models.user import User
from app.db.models.seller import Seller
from app.db.models.evaluation import Evaluation, Answer
from app.db.models.question import Question

router = APIRouter()

@router.get("/validator/dashboard")
def dashboard_validador(user: User = Depends(get_current_user), db: Session = Depends(get_db), stage=None):
    # Evaluaciones hechas por este validador
    evaluations = db.query(Evaluation).filter(Evaluation.user_id == user.id).all()

    # 1. Top vendedores
    score_per_seller = defaultdict(list)
    for ev in evaluations:
        for r in ev.answers:
            score_per_seller[ev.seller_id].append(r.valor)

    top_sellers = []
    for seller_id, values in score_per_seller.items():
        seller = db.query(Seller).get(seller_id)
        average = sum(values) / len(values)
        top_sellers.append({"name": seller.nombre, "average": round(average, 2)})

    top_sellers.sort(key=lambda x: x["average"], reverse=True)
    top_sellers = top_sellers[:5]

    # 2. Entrevistas por mes
    assessments_per_month = defaultdict(int)
    for ev in evaluations:
        mes = ev.fecha.strftime("%B")
        assessments_per_month[mes] += 1

    assessment_chart = [{"month": mes, "amount": assessments_per_month[mes]} for mes in assessments_per_month]

    # 3. Promedio por etapa
    stage_scores = defaultdict(list)
    for ev in evaluations:
        for r in ev.answers:
            question = db.query(Question).get(r.pregunta_id)
            stage_scores[question.stage].append(r.valor)

    stages_chart = [
        {"stage": stage, "average": round(sum(vals)/len(vals), 2)}
        for stage, vals in stage_scores.items()
    ]

    return {
        "topSellers": top_sellers,
        "interviewsPerMonth": assessment_chart,
        "performancePerStage": stages_chart
    }


@router.get("/admin/dashboard")
def dashboard_admin(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if user.rol != "admin":
        return {"detail": "No autorizado"}

    evaluations = db.query(Evaluation).all()

    # 1. Total entrevistas y evaluadores
    total_assessments = len(evaluations)
    total_validators = db.query(User).filter(User.role == "validator").count()

    # 2. Score promedio global por vendedor
    score_per_seller = defaultdict(list)
    for ev in evaluations:
        for r in ev.answers:
            score_per_seller[ev.seller_id].append(r.valor)

    top_sellers = []
    for seller_id, values in score_per_seller.items():
        seller = db.query(Seller).get(seller_id)
        average = sum(values) / len(values)
        top_sellers.append({"name": seller.nombre, "average": round(average, 2)})

    top_sellers.sort(key=lambda x: x["average"], reverse=True)
    top_sellers = top_sellers[:5]

    # 3. Etapas más débiles a nivel global
    stage_scores = defaultdict(list)
    for ev in evaluations:
        for r in ev.answers:
            question = db.query(Question).get(r.question_id)
            stage_scores[question.etapa].append(r.valor)

    average_stage = [
        {"stage": stage, "average": round(sum(vals)/len(vals), 2)}
        for stage, vals in stage_scores.items()
    ]
    average_stage.sort(key=lambda x: x["average"])

    return {
        "resume": {
            "totalAssesssments": total_assessments,
            "totalValidators": total_validators
        },
        "topSellers": top_sellers,
        "weakStages": average_stage[:3]
    }
