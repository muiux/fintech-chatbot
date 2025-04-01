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
  response: string;
  created_at?: Date;
}

export interface DecodedToken {
  exp: number;
  sub: string;
}

export type ProductItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  thumbnail: string;
  brand: string;
  discountPercentage: number;
};
