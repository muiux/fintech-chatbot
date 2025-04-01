import { createContext, useContext } from "react";

interface AuthContextType {
  token: string | null;
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  isSmallScreen: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => useContext(AuthContext) as AuthContextType;
