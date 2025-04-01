import api from "./api";
import {
  LoginCredentials,
  LoginResponse,
  RegisterUserData,
} from "../types/types";

const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", credentials, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const registerUser = async (userData: RegisterUserData): Promise<void> => {
  try {
    await api.post("/auth/register", userData);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { loginUser, registerUser };
