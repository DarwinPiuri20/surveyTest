from sqlalchemy.orm import Session
from app.db.session import SessionLocal, engine, Base
from app.db.models.user import User
from app.core.security import get_password_hash

def init():
    Base.metadata.create_all(bind=engine)  # Crea las tablas si no existen
    db: Session = SessionLocal()

    # Verificar si ya existe el usuario admin
    admin_user = db.query(User).filter(User.email == "admin@admin.com").first()
    if not admin_user:
        user = User(
            name="Admin",
            email="admin@admin.com",
            hashed_password=get_password_hash("admin123"),
            role="admin"
        )
        db.add(user)
        db.commit()
        print("✅ Usuario admin creado: admin@admin.com / admin123")
    else:
        print("⚠️ Usuario admin ya existe.")

if __name__ == "__main__":
    init()
