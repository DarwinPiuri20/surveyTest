from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import auth, preguntas, evaluaciones, dashboard, usuarios, vendedores
from app.db.session import engine, Base

app = FastAPI(title="Evaluación Comercial API")

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
app.include_router(questions.router, prefix="/api")
app.include_router(evaluations.router, prefix="/api")
app.include_router(dashboard.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(sellers.router, prefix="/api")

# Inicializar DB
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
