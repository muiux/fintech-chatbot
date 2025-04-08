from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from auth.auth_handler import get_current_active_user
from database import get_db
from models import ChatSession, User

import logging

router = APIRouter(prefix="/sessions", tags=["Sessions"])

@router.get("/", response_model=list[ChatSession])
def get_sessions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    try:
        sessions = (
            db.query(ChatSession)
            .filter(ChatSession.user_id == current_user.id)
            .order_by(ChatSession.created_at.desc())
            .all()
        )
        return sessions

    except SQLAlchemyError as e:
        logging.error(f"Database error while fetching sessions: {e}")
        raise HTTPException(status_code=500, detail="Database error occurred")

    except Exception as e:
        logging.exception("Unexpected error while fetching sessions")
        raise HTTPException(status_code=500, detail="Internal server error")
