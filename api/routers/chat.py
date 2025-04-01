from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from auth.auth_handler import get_current_active_user
from database import get_db
from models import ChatMessage, User
from schemas import ChatMessageResponse, ChatMessageCreate
from ai_chat.gemini_query import generate_answer

router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("/", response_model=ChatMessageResponse)
def send_message(
    chat_data: ChatMessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    chat_message = ChatMessage(
        user_id=current_user.id,
        query=chat_data.query,
        response=generate_answer(chat_data.query)
    )
    db.add(chat_message)
    db.commit()
    db.refresh(chat_message)
    return chat_message


@router.get("/history", response_model=list[ChatMessageResponse])
def get_chat_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
    page: int = Query(1, alias="page"),
    page_size: int = Query(5, alias="page_size"),
):
    offset = (page - 1) * page_size
    
    chat_history = (
        db.query(ChatMessage)
        .filter(ChatMessage.user_id == current_user.id)
        .order_by(ChatMessage.created_at.desc())
        .offset(offset)
        .limit(page_size)
        .all()
    )

    return chat_history
