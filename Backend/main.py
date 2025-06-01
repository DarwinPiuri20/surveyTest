from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import feedback
from app.api.routes import auth, question, evaluations, dashboard, users, seller
from app.db.session import engine, Base

app = FastAPI(title="Evaluación Comercial API")
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ajustar en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas
app.include_router(auth.router, prefix="/api")
app.include_router(question.router, prefix="/api")
app.include_router(evaluations.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(seller.router, prefix="/api")
app.include_router(feedback.router, prefix="/api")


