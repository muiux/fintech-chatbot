import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../services/auth.service";
import { LoginCredentials, LoginResponse } from "../types/types";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response: LoginResponse = await loginUser(credentials);
      if (response?.access_token) {
        localStorage.setItem("token", response.access_token);
        return response.access_token;
      }
      throw new Error("Login failed");
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data);
      navigate("/chat");
    },
    onError: (error) => {
      console.log(error);
      throw error;
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (userData: {
      username: string;
      email: string;
      password: string;
    }) => {
      await registerUser(userData);
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
      throw error;
    },
  });
};
