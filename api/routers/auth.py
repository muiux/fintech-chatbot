from datetime import timedelta

from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends, HTTPException, status, APIRouter
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from auth.auth_handler import authenticate_user, ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token, get_user, get_password_hash
from database import get_db
from schemas import Token, UserCreate, UserResponse
from models import User

import logging

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        db_user = get_user(db, user.username)
        if db_user:
            raise HTTPException(status_code=400, detail="Username already registered.")

        hashed_password = get_password_hash(user.password)
        db_user = User(
            username=user.username,
            email=user.email,
            hashed_password=hashed_password
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    except SQLAlchemyError as e:
        logging.error(f"Database error during registration: {e}")
        raise HTTPException(status_code=500, detail="Database error occurred during registration.")

    except Exception as e:
        logging.exception("Unexpected error during registration")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/login")
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
) -> Token:
    try:
        user = authenticate_user(db, form_data.username, form_data.password)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
        access_token = create_access_token(
            data={"sub": user.username}, expires_delta=access_token_expires
        )
        return Token(access_token=access_token, token_type="bearer")

    except SQLAlchemyError as e:
        logging.error(f"Database error during login: {e}")
        raise HTTPException(status_code=500, detail="Database error occurred during login.")

    except Exception as e:
        logging.exception("Unexpected error during login")
        raise HTTPException(status_code=500, detail="Internal server error")
