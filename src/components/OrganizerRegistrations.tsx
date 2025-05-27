"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getOrganizerRegistrations } from "@/services/eventService";

interface Inscricao {
    id: number;
    status: string;
    numeroAtleta: string;
    usuario: {
        nome: string;
        email: string;
    };
    evento: {
        id: number;
        nome: string;
        dataInicio: string;
        localizacao: string;
    };
}

export default function OrganizerRegistrations() {
    const { token } = useAuth();
    const [inscricoes, setInscricoes] = useState<Inscricao[]>([]);
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;

        getOrganizerRegistrations(token)
            .then((res) => setInscricoes(res.data))
            .catch(() => setErro("Erro ao carregar inscrições dos seus eventos"))
            .finally(() => setLoading(false));
    }, [token]);

    if (loading) return <p className="text-center mt-20">Carregando inscrições...</p>;
    if (erro) return <p className="text-red-500 text-center mt-20">{erro}</p>;
    if (inscricoes.length === 0) return <p className="text-center mt-20">Nenhuma inscrição nos seus eventos ainda.</p>;

    return (
        <div className="w-full max-w-4xl mx-auto px-4 pt-6">
            <h2 className="text-3xl font-bold text-primary mb-6 text-center">Inscrições Recebidas</h2>
            <ul className="flex flex-col gap-6">
                {inscricoes.map(({ id, status, numeroAtleta, usuario, evento }) => (
                    <li key={id} className="bg-foreground rounded-2xl p-4 shadow-lg">
                        <h3 className="text-xl font-semibold text-primary">{evento.nome}</h3>
                        <p className="text-white text-sm"><strong>📅 Data:</strong> {new Date(evento.dataInicio).toLocaleDateString()}</p>
                        <p className="text-white text-sm"><strong>📍 Local:</strong> {evento.localizacao}</p>
                        <p className="text-white text-sm"><strong>👤 Atleta:</strong> {usuario.nome} ({usuario.email})</p>
                        <p className="text-white text-sm"><strong>🎽 Nº Atleta:</strong> {numeroAtleta}</p>
                        <p className="text-white text-sm"><strong>Status:</strong> {status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
