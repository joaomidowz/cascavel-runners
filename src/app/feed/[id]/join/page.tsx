"use client";

import JoinForm from "@/src/components/JoinForm";
import { useParams, useRouter } from "next/navigation";
import { feedMock } from "@/src/components/data/feedMock";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";

export default function JoinPage() {
    const router = useRouter();
    const { id } = useParams();
    const race = feedMock.find((item) => item.id === Number(id));

    if (!race) return <div className="text-center mt-20 text-xl">Corrida não encontrada</div>;

    return (
        <div className="bg-background min-h-screen flex flex-col items-center pb-20">
            <div className="w-full max-w-4xl px-4">
                <IoIosArrowBack
                    className="text-3xl text-primary mt-6 mb-2 cursor-pointer"
                    onClick={() => router.back()}
                />

                <h1 className="text-3xl text-primary font-bold text-center mb-4">{race.title}</h1>

                <div className="rounded-3xl overflow-hidden mb-6 aspect-[3/2] relative">
                    <Image
                        src={race.image}
                        alt={race.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                {/* 🔽 Descrição da corrida */}
                <div className="bg-white/90 dark:bg-white/10 text-black dark:text-white rounded-2xl p-6 mb-10 shadow-md flex flex-col gap-2 text-sm md:text-base">
                    <p><strong>📍 Local:</strong> Parque Municipal de Cascavel</p>
                    <p><strong>📅 Data:</strong> 25 de Agosto de 2025</p>
                    <p><strong>🕒 Horário:</strong> Largada às 7h30</p>
                    <p><strong>📏 Distância:</strong> 5km, 10km e Caminhada de 3km</p>
                    <p><strong>🏃 Modalidades:</strong> Corrida individual, caminhada recreativa</p>
                    <p className="pt-2">
                        <strong>📄 Descrição:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                        Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
                    </p>
                </div>
            </div>

            <JoinForm />
        </div>
    );
}
