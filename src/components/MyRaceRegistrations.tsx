"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getMyRegistrations } from "@/services/eventRegistrationService";
import Link from "next/link";

interface Inscricao {
  id: number;
  status: string;
  numeroAtleta: string;
  evento: {
    id: number;
    nome: string;
    dataInicio: string;
    localizacao: string;
    capaUrl?: string;
  };
}

export default function MyRaceRegistrations() {
  const { token } = useAuth();
  const [inscricoes, setInscricoes] = useState<Inscricao[]>([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    getMyRegistrations(token)
      .then((res) => setInscricoes(res.data))
      .catch(() => setErro("Erro ao carregar suas inscrições"))
      .finally(() => setLoading(false));
  }, [token]);

  if (!token) return <p className="text-center mt-20">Você precisa estar logado para ver suas corridas.</p>;
  if (loading) return <p className="text-center mt-20">Carregando suas inscrições...</p>;
  if (erro) return <p className="text-center text-red-500 mt-20">{erro}</p>;
  if (inscricoes.length === 0) return <p className="text-center mt-20">Você ainda não está inscrito em nenhuma corrida.</p>;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-24 pb-16">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">Minhas Inscrições</h2>
      <ul className="flex flex-col gap-6">
        {inscricoes.map(({ id, status, numeroAtleta, evento }) => (
          <li key={id} className="bg-foreground rounded-2xl p-4 shadow-lg">
            <Link href={`/feed/${evento.id}`}>
              <h3 className="text-xl font-semibold text-primary">{evento.nome}</h3>
            </Link>
            <p className="text-white text-sm mt-1"><strong>📅 Data:</strong> {new Date(evento.dataInicio).toLocaleDateString()}</p>
            <p className="text-white text-sm"><strong>📍 Local:</strong> {evento.localizacao}</p>
            <p className="text-white text-sm"><strong>🎽 Número do atleta:</strong> {numeroAtleta}</p>
            <p className="text-white text-sm"><strong>Status:</strong> {status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
