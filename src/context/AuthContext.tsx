"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

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
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Restaurar auth do localStorage ao carregar
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("usuario");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Erro ao restaurar autenticação:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, senha: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (!res.ok) {
      let message = "Erro ao fazer login";
      try {
        const err = await res.json();
        message = err.message || message;
      } catch {
        message = await res.text();
      }
      throw new Error(message);
    }

    const { access_token, user } = await res.json();

    localStorage.setItem("token", access_token);
    localStorage.setItem("usuario", JSON.stringify(user));
    setToken(access_token);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
};
