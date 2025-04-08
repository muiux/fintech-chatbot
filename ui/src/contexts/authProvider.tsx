import React, { useState, ReactNode, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import { DecodedToken } from "../types/types";
import { useMediaQuery, useTheme } from "@mui/material";
import { useLogin, useRegister } from "../hooks/useAuth";
import { Snackbar, Alert } from "@mui/material";
import { useToast } from "../hooks/useToast";
import { AxiosError } from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { mutateAsync: loginMutation } = useLogin();
  const { mutateAsync: registerMutation } = useRegister();
  const { toasts, addToast, removeToast } = useToast();

  const isAuthenticated = Boolean(token);

  const login = async (username: string, password: string) => {
    try {
      await loginMutation({ username, password });
      setToken(localStorage.getItem("token"));
      addToast("Login successful!", "success");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.detail ||
          error.message ||
          "An unexpected error occurred";
        addToast(`Login failed: ${errorMessage}`, "error");
      } else {
        addToast(`An unknown error occurred: ${String(error)}`, "error");
      }
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      await registerMutation({ username, email, password });
      addToast("Registration successful!", "success");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.detail ||
          error.message ||
          "An unexpected error occurred";
        addToast(`Registration failed: ${errorMessage}`, "error");
      } else {
        addToast(`An unknown error occurred: ${String(error)}`, "error");
      }
    }
  };

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUser(decoded.sub);

        const expirationTime = decoded.exp * 1000;
        const timeLeft = expirationTime - Date.now();

        if (timeLeft > 0) {
          const timeout = setTimeout(() => {
            logout();
          }, timeLeft);

          return () => clearTimeout(timeout);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, [token, logout]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        register,
        logout,
        isSmallScreen,
        isMediumScreen,
        isAuthenticated,
      }}
    >
      {children}
      {toasts.map((toast, index) => (
        <Snackbar
          key={index}
          open={true}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={6000}
          onClose={() => removeToast(index)}
        >
          <Alert severity={toast.type} onClose={() => removeToast(index)}>
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </AuthContext.Provider>
  );
};
