import { User } from "firebase/auth";
import React from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string>;
  createUser: (email: string, password: string) => Promise<string>;
};

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  loading: false,
  login: () => null,
  createUser: () => null,
});

export const useAuthContext = () => {
  const ctx = React.useContext(AuthContext);

  if (!ctx) {
    console.error("Auth context is not configured");
  }

  return ctx;
};
