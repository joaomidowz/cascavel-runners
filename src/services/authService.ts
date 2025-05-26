export interface UsuarioRegister {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  fotoPerfilUrl?: string;
  biografia?: string;
  cidade?: string;
  estado?: string;
  pais?: string;
  dataNascimento?: string;
  genero?: string;
}

export interface OrganizadorRegister {
  nome: string;
  email: string;
  senha: string;
  cnpj: string;
  nomeEmpresa: string;
  cpf: string;
  site?: string;
  fotoPerfilUrl?: string;
  biografia?: string;
  cidade?: string;
  estado?: string;
  pais?: string;
  dataNascimento?: string;
  genero?: string;
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

export async function registerUser(data: UsuarioRegister) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Erro ao registrar usuário");
  }

  return res.json();
}

export async function registerOrganizer(data: OrganizadorRegister) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}usuarios/organizador`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Erro ao registrar organizador");
  }

  return res.json();
}
