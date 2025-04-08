from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from auth.auth_handler import get_current_active_user
from database import get_db
from models import ChatMessage, ChatSession, User
from schemas import ChatMessageCreate
from ai_chat.gemini_query import generate_answer, summarize_query
import logging
import random

router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("/", response_model=ChatMessage)
def send_message(
    chat_data: ChatMessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    try:
        if chat_data.session_id:
            session = db.query(ChatSession).filter(
                ChatSession.id == chat_data.session_id,
                ChatSession.user_id == current_user.id
            ).first()
            if not session:
                raise HTTPException(status_code=404, detail="Session not found")
        else:
            try:
                session_title = summarize_query(chat_data.query)
            except Exception as e:
                logging.error(f"Error summarizing query: {e}")
                raise HTTPException(status_code=500, detail="Error summarizing query. Please check API key or service status.")

            session = ChatSession(
                user_id=current_user.id,
                title=session_title,
            )
            db.add(session)
            db.commit()
            db.refresh(session)

        try:
            response = generate_answer(chat_data.query)
        except Exception as e:
            logging.error(f"Error generating response: {e}")
            raise HTTPException(status_code=500, detail="Error generating response. Please check API key or service status.")

        chat_message = ChatMessage(
            user_id=current_user.id,
            session_id=session.id,
            query=chat_data.query,
            response=response
            # response=random.choice([
            #     "Hello! How can I assist you today?",
            #     "Sure, let me help you with that.",
            #     "I'm sorry to hear that. Let me look into it for you.",
            #     "Please try restarting your device and let me know if the issue persists.",
            #     "That’s awesome! Tell me more!",
            #     "Haha, that made me smile 😄"
            # ])
        )
        db.add(chat_message)
        db.commit()
        db.refresh(chat_message)

        return chat_message

    except Exception as e:
        logging.exception("Unexpected error occurred during message processing.")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/history/{session_id}", response_model=list[ChatMessage])
def get_chat_history(
    session_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
    page: int = Query(1, alias="page", ge=1),
    page_size: int = Query(5, alias="page_size", ge=1, le=100),
):
    try:
        session = db.query(ChatSession).filter(
            ChatSession.id == session_id,
            ChatSession.user_id == current_user.id
        ).first()

        if not session:
            raise HTTPException(status_code=404, detail="Session not found")

        offset = (page - 1) * page_size

        chat_history = (
            db.query(ChatMessage)
            .filter(ChatMessage.session_id == session_id, ChatMessage.user_id == current_user.id)
            .order_by(ChatMessage.created_at.desc())
            .offset(offset)
            .limit(page_size)
            .all()
        )

        return chat_history

    except SQLAlchemyError as e:
        logging.error(f"Database error during chat history fetch: {e}")
        raise HTTPException(status_code=500, detail="Database error occurred")

    except Exception as e:
        logging.exception("Unexpected error during chat history fetch")
        raise HTTPException(status_code=500, detail="Internal server error")
