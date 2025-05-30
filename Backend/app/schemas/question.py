from pydantic import BaseModel

class QuestionBase(BaseModel):
    text: str
    stage: str

class QuestionCreate(QuestionBase): pass

class QuestionOut(QuestionBase):
    id: int

    class Config:
        orm_mode = True
