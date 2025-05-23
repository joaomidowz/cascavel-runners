// src/utils/getToken.ts
export function getToken(): string {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token não encontrado.");
  return token;
}
