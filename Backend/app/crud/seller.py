from sqlalchemy.orm import Session
from app.db.models.seller import Seller

def get_sellers(db: Session):
    return db.query(Seller).all()

def create_seller(db: Session, name: str):
    seller = Seller(name=name)
    db.add(seller)
    db.commit()
    db.refresh(seller)
    return seller
