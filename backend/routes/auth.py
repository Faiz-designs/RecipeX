from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os
from database import get_db
from models.user import User

router = APIRouter(prefix="/auth", tags=["Authentication"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("JWT_SECRET", "super-secret-key-change-this")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))


class UserRegister(BaseModel):
    username: str
    email: str
    password: str
    full_name: str = ""
    age: int = 0
    allergies: str = ""
    medical_conditions: str = ""
    dietary_preferences: str = ""


class UserLogin(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: int


@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):
    existing = db.query(User).filter(
        (User.username == user.username) | (User.email == user.email)
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username or email already exists")

    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=pwd_context.hash(user.password),
        full_name=user.full_name,
        age=user.age,
        allergies=user.allergies,
        medical_conditions=user.medical_conditions,
        dietary_preferences=user.dietary_preferences,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created", "user_id": new_user.id}


@router.post("/login", response_model=TokenResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or not pwd_context.verify(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = jwt.encode(
        {
            "sub": str(db_user.id),
            "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
        },
        SECRET_KEY,
        algorithm=ALGORITHM,
    )
    return TokenResponse(access_token=token, user_id=db_user.id)
