import { Event } from "@/types/Event";

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}eventos`;

// Buscar todos os eventos
export async function getEvent(): Promise<{ data: Event[] }> {
  const res = await fetch(API_BASE, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) throw await formatError(res);
  return res.json();
}

// Buscar um evento específico por ID
export async function getEventById(id: number): Promise<Event> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) throw await formatError(res);
  return res.json();
}

// Criar novo evento
export async function createEvent(data: Partial<Event>, token: string): Promise<Event> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const responseText = await res.text();

  if (!res.ok) {
    console.error("Erro da API (bruto):", responseText);
    try {
      const json = JSON.parse(responseText);
      throw new Error(json.message || "Erro ao criar evento.");
    } catch {
      throw new Error(responseText || "Erro ao criar evento.");
    }
  }

  try {
    return JSON.parse(responseText);
  } catch {
    console.error("Resposta inválida:", responseText);
    throw new Error("Erro ao interpretar resposta da API.");
  }
}

// Função interna para lidar com erros genéricos
async function formatError(res: Response): Promise<Error> {
  try {
    const json = await res.json();
    return new Error(json.message || "Erro inesperado.");
  } catch {
    const text = await res.text();
    return new Error(text || "Erro desconhecido.");
  }
}
