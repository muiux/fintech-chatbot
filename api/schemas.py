from pydantic import BaseModel
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserResponse(BaseModel):
    username: str
    email: str | None = None

class UserInDB(UserResponse):
    hashed_password: str

class ChatMessageCreate(BaseModel):
    query: str

class ChatMessageResponse(BaseModel):
    id: str
    query: str
    response: str
    created_at: datetime