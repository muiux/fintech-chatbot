export interface User {
  username: string;
  email: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface RegisterUserData {
  username: string;
  email: string;
  password: string;
}

export interface ChatQA {
  id?: string;
  query: string;
  session_id?: string;
  response: string;
  created_at?: Date;
}

export interface DecodedToken {
  exp: number;
  sub: string;
}

export interface ChatSession {
  id: number;
  title: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface ChatMessageCreate {
  query: string;
  session_id?: string;
}
