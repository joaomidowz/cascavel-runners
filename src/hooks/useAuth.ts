// src/hooks/useAuth.ts
import { useState } from 'react';
import { login } from '../app/services/authService';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const loginUsuario = async (email: string, senha: string) => {
    try {
      setLoading(true);
      setErro(null);
      const data = await login(email, senha);
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('usuario', JSON.stringify(data.user));
      return data;
    } catch (err: any) {
      setErro(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loginUsuario, loading, erro };
}
