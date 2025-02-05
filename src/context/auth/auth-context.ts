"use client";

import { createContext } from "react";

interface AuthContext {
  user: User | undefined;
  authToken: string | undefined;
}

interface AuthContextActions {
  setAuthToken: (token: string) => void;
  setUser: (user: User) => void;
  updateUser: () => void;
  signin: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContext>({
  user: undefined,
  authToken: undefined,
});

export const AuthContextActions = createContext<AuthContextActions>({
  setAuthToken: () => {},
  setUser: () => {},
  updateUser: () => {},
  signin: () => {},
  logout: () => {},
});
