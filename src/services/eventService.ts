export async function createEvent(data: any, token: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}eventos`;

  console.log("POST para:", url);
  console.log("Payload:", data);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const responseText = await res.text(); // pega o texto antes

  if (!res.ok) {
    console.error("Erro da API (texto bruto):", responseText);
    try {
      const json = JSON.parse(responseText);
      throw new Error(json.message || "Erro ao criar evento");
    } catch {
      throw new Error(responseText || "Erro ao criar evento");
    }
  }

  try {
    return JSON.parse(responseText);
  } catch {
    console.error("Resposta não era JSON:", responseText);
    throw new Error("Erro ao interpretar resposta da API.");
  }
}
