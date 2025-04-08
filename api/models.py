import uuid as uuid_pkg
from sqlmodel import SQLModel, Field
from datetime import datetime

Base = SQLModel

class User(Base, table=True):
    id: str = Field(default_factory=uuid_pkg.uuid4, nullable=False, primary_key=True, index=True)
    username: str = Field(default=None)
    email: str = Field(sa_column_kwargs={"unique": True})
    hashed_password: str = Field(default=None)

class ChatMessage(Base, table=True):
    id: str = Field(default_factory=uuid_pkg.uuid4, primary_key=True)
    session_id: str = Field(foreign_key="chatsession.id")
    user_id: str = Field(foreign_key="user.id")
    query: str = Field(default=None, max_length=5000)
    response: str = Field(default=None, max_length=10000)
    created_at: datetime = Field(default_factory=lambda: datetime.now())

class ChatSession(Base, table=True):
    id: str = Field(default_factory=uuid_pkg.uuid4, primary_key=True)
    user_id: str = Field(foreign_key="user.id")
    title: str = Field(default="New Chat")
    created_at: datetime = Field(default_factory=lambda: datetime.now())