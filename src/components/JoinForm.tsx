"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { registerToEvent } from "@/services/eventRegistrationService";

interface Props {
    eventoId: number;
}

export default function JoinForm({ eventoId }: Props) {
    const { token, user } = useAuth();
    const router = useRouter();
    const [form, setForm] = useState({
        numeroAtleta: "",
        observacoes: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token || !user) {
            router.push("/login");
            return;
        }

        try {
            await registerToEvent(
                {
                    eventoId,
                    numeroAtleta: form.numeroAtleta,
                    observacoes: form.observacoes,
                },
                token
            );

            router.push("/profile");
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Erro ao tentar se inscrever no evento.";
            console.error(err);
            alert(message);
        }

    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-10 py-6 w-full max-w-lg mx-auto bg-background rounded-3xl shadow-lg">
            <h1 className="text-2xl font-bold text-primary text-center">Inscreva-se na Corrida</h1>

            <label className="pl-2 text-lg">Número do atleta (opcional):</label>
            <input
                className="rounded-3xl py-3 px-5 outline-1 outline-primary"
                type="text"
                value={form.numeroAtleta}
                onChange={(e) => setForm({ ...form, numeroAtleta: e.target.value })}
            />

            <label className="pl-2 text-lg">Observações:</label>
            <textarea
                className="rounded-3xl py-3 px-5 outline-1 outline-primary"
                value={form.observacoes}
                onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
            />

            <button className="btn mt-3" type="submit">Confirmar Inscrição</button>
        </form>
    );
}
