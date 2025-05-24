"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getEventById } from "@/services/eventService";
import CardRace from "@/components/CardRace";
import CommentsRace from "@/components/CommentsRace";
import { IoIosArrowBack } from "react-icons/io";

interface Event {
  id: number;
  nome: string;
  descricao: string;
  localizacao: string;
  dataInicio: string;
  dataFim: string;
  capaUrl?: string;
}

const fallbackImages = [
  "carousel-1.jpg",
  "carousel-2.jpg",
  "carousel-3.jpg",
];

export default function RacePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [evento, setEvento] = useState<Event | null>(null);
  const [erro, setErro] = useState("");
  const raceId = Number(params.id);

  useEffect(() => {
    if (!isNaN(raceId)) {
      getEventById(raceId)
        .then(setEvento)
        .catch((err) => {
          console.error(err);
          setErro("Erro ao carregar evento.");
        });
    }
  }, [raceId]);

  if (erro) return <p className="text-center text-red-500 mt-20">{erro}</p>;
  if (!evento) return <p className="text-center mt-20">Carregando corrida...</p>;

  return (
    <div className="bg-background min-h-screen px-4 pt-28 pb-12 relative flex flex-col items-center">
      <IoIosArrowBack
        className="absolute left-5 top-20 text-2xl text-white cursor-pointer"
        onClick={() => router.back()}
      />

      <CardRace
        title={evento.nome}
        image={`/${fallbackImages[evento.id % fallbackImages.length]}`}
        likes={0}
        comments={0}
        date={evento.dataInicio}
        localizacao={evento.localizacao}
        descricao={evento.descricao}
      />

      <div className="mt-6 w-full max-w-4xl">
        <CommentsRace />
      </div>
    </div>
  );
}
