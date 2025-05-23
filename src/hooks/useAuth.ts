// src/hooks/useAuth.ts
import { useState } from "react";
import { login } from "../services/authService";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const loginUsuario = async (email: string, senha: string) => {
    try {
      setLoading(true);
      setErro(null);
      const data = await login(email, senha);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("usuario", JSON.stringify(data.user));
      return data;
    } catch (err) {
      if (err instanceof Error) {
        setErro(err.message);
        throw err;
      } else {
        setErro("Erro desconhecido ao fazer login.");
        throw new Error("Erro desconhecido ao fazer login.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loginUsuario, loading, erro };
}
