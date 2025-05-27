// src/services/eventRegistrationService.ts

interface RegisterEventPayload {
  eventoId: number;
  numeroAtleta?: string;
  status?: string;
  origemInscricao?: string;
  comprovantePagamentoUrl?: string;
  observacoes?: string;
}

export async function registerToEvent(payload: RegisterEventPayload, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}evento-inscricoes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...payload,
      numeroAtleta: payload.numeroAtleta || `A${Math.floor(Math.random() * 90000) + 10000}`,
      status: payload.status || "Inscrito",
      origemInscricao: payload.origemInscricao || "app",
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Erro ao se inscrever no evento.");
  }

  return res.json();
}
