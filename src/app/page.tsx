"use client"

import Carousel from "../components/Carousel"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Reveal from "../components/Reveal"

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden overflow-y-auto">

      {/* Fundo e sobreposição */}
      <div className="fixed top-0 left-0 w-full h-full -z-50 bg-[url('/wallpaperImg.jpg')] bg-cover bg-center bg-fixed" />
      <div className="absolute top-0 left-0 w-full h-[65vh] bg-background/85 clip-diagonal z-10" />

      {/* Navbar (sem animação) */}
      <div className="relative z-40 flex flex-col items-center pt-20">
        <div className="z-30">
          <Navbar />
        </div>

        {/* Animação começa no h1 */}
        <Reveal direction="up">
          <h1 className="text-3xl text-primary p-10 text-center">
            Bem-vindo à Cascavel Runners
          </h1>
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <button className="bg-btn-primary py-3 px-5 rounded-2xl text-btn-text cursor-pointer hover:bg-primary/60 active:bg-btn-primary/50 transition duration-500">
            Comece a se desafiar agora!
          </button>
        </Reveal>
      </div>

      <div className="bg-background mt-[55vh] p-10 z-30 relative flex flex-col items-center gap-8">
        <Reveal direction="up" delay={0.2}>
          <h3 className="text-3xl text-center font-bold mb-4">🏃‍♂️ Corrida é transformação</h3>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <div className="text-center text-lg">
            <p className="mb-4">
              Correr não é apenas uma atividade física — é uma jornada pessoal. Cada passo é um desafio vencido,
              cada quilômetro, uma conquista. Seja em busca de saúde, superação ou paz interior, a corrida
              transforma o corpo e a mente.
            </p>
            <p className="mb-4">
              O movimento constante, o vento no rosto, o som dos tênis no asfalto... tudo isso faz da corrida um
              estilo de vida. Aqui na <strong>Cascavel Runners</strong>, celebramos cada corredor: do iniciante ao maratonista.
            </p>
            <p className="font-semibold italic">
              E aí, já calçou o tênis hoje?
            </p>
          </div>
        </Reveal>

      </div>
      <div className="bg-background pb-10 px-5">
      <Reveal direction="up" delay={0.4}>
        <Carousel />
      </Reveal>
      </div>
    </div>
  )
}
