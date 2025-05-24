"use client";

import { useEffect, useState } from "react";
import CardFeed from "@/components/CardFeed";
import NavbarAuthenticated from "@/components/NavbarAuthenticated";
import { getEvent } from "@/services/eventService";
import { Event } from "@/types/Event";

const fallbackImages = [
    "carousel-1.jpg",
    "carousel-2.jpg",
    "carousel-3.jpg",
];

export default function Feed() {
    const [eventos, setEventos] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        getEvent()
            .then((data) => {
                setEventos(data.data || []);
            })
            .catch((err) => {
                console.error(err);
                setErro("Erro ao carregar eventos.");
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="bg-background min-h-screen flex flex-col justify-between items-center">
            <div className="mb-10">
                <NavbarAuthenticated />
            </div>

            {loading ? (
                <p className="text-center text-xl mt-20">Carregando corridas...</p>
            ) : erro ? (
                <p className="text-center text-red-500 mt-20">{erro}</p>
            ) : (
                <div className="w-full flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 p-10">
                    {eventos.map((evento, index) => (
                        <CardFeed
                            key={evento.id}
                            id={evento.id}
                            title={evento.nome}
                            image={`/${fallbackImages[index % fallbackImages.length]}`}
                            likes={0}
                            comments={0}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
