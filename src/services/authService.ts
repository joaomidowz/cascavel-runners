interface UsuarioRegister {
  nome: string;
  email: string;
  senha: string;
  fotoPerfilUrl?: string;
  biografia?: string;
  cidade?: string;
  estado?: string;
  pais?: string;
  dataNascimento?: string;
  genero?: string;
}

interface OrganizadorRegister extends UsuarioRegister {
  nomeEmpresa: string;
  cnpj: string;
  site?: string;
}

export async function login(email: string, senha: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Erro ao fazer login");
  }

  return res.json();
}

export async function register(
  data: UsuarioRegister | OrganizadorRegister,
  isOrganizer = false
) {
  const endpoint = isOrganizer ? "usuarios/organizador" : "usuarios";

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Erro ao registrar");
  }

  return res.json();
}
