from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import get_password_hash
from app.db.models.user import User
from app.db.session import SessionLocal
from app.crud.user import get_users
from app.schemas.user import UserCreate, UserOut
router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/users")
def list_users(db: Session = Depends(get_db)):
    return get_users(db)


@router.post("/create", response_model=UserOut)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Ya existe un usuario con ese correo")

    db_user = User(
        name=user.name,
        email=user.email,
        hashed_password=get_password_hash(user.password),
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user