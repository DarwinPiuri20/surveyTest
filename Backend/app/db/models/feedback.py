from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.session import Base

class Feedback(Base):
    __tablename__ = "feedbacks"

    id = Column(Integer, primary_key=True, index=True)
    seller_id = Column(Integer, ForeignKey("sellers.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    content = Column(String, nullable=False)
    date = Column(DateTime, default=datetime.utcnow)

    seller = relationship("Seller", backref="feedbacks")
    user = relationship("User", backref="generated_feedbacks")
