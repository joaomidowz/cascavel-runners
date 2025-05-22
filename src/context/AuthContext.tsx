"use client";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: number;
  nome: string;
  email: string;
  nivelPermissao: number;
  fotoPerfilUrl?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, senha: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Erro ao fazer login");
    }

    const { access_token, user } = await res.json();

    // Armazena local e em memória
    localStorage.setItem("token", access_token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(access_token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
};
