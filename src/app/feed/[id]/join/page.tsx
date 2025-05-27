"use client";

import JoinForm from "@/components/JoinForm";
import { useParams, useRouter } from "next/navigation";
import { getEventById } from "@/services/eventService";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { Event } from "@/types/Event";

const fallbackImages = [
    "/carousel-1.jpg",
    "/carousel-2.jpg",
    "/carousel-3.jpg",
];

export default function JoinPage() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const [evento, setEvento] = useState<Event | null>(null);
    const [erro, setErro] = useState("");

    useEffect(() => {
        if (id) {
            getEventById(Number(id))
                .then(setEvento)
                .catch(() => setErro("Erro ao carregar evento."));
        }
    }, [id]);

    const getImageSrc = (url: string | undefined, id: number) => {
        if (url && url.trim() !== "") return url;
        return fallbackImages[id % fallbackImages.length];
    };

    if (erro) return <div className="text-center mt-20 text-xl">{erro}</div>;
    if (!evento) return <div className="text-center mt-20 text-xl">Carregando evento...</div>;

    return (
        <div className="bg-background min-h-screen flex flex-col items-center pb-20">
            <div className="w-full max-w-4xl px-4">
                <IoIosArrowBack
                    className="text-3xl text-primary mt-6 mb-2 cursor-pointer"
                    onClick={() => router.back()}
                />
                <h1 className="text-3xl text-primary font-bold text-center mb-4">{evento.nome}</h1>

                <div className="rounded-3xl overflow-hidden mb-6 aspect-[3/2] relative">
                    <Image
                        src={getImageSrc(evento.capaUrl, evento.id)}
                        alt={evento.nome}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="bg-white/90 dark:bg-white/10 text-black dark:text-white rounded-2xl p-6 mb-10 shadow-md text-sm md:text-base">
                    <p><strong>📍 Local:</strong> {evento.localizacao}</p>
                    <p><strong>📅 Data:</strong> {new Date(evento.dataInicio).toLocaleDateString()}</p>
                    <p className="pt-2"><strong>📄 Descrição:</strong> {evento.descricao}</p>
                </div>
            </div>

            <JoinForm eventoId={evento.id} />
        </div>
    );
}
