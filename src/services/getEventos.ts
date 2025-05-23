export async function getEventos() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}eventos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    let message = "Erro ao carregar eventos.";
    try {
      const err = await res.json();
      message = err.message || message;
    } catch {
      const errText = await res.text();
      message = errText || message;
    }
    throw new Error(message);
  }

  return res.json();
}
