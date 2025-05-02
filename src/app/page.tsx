import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden overflow-y-auto">

      {/* Fundo fixo */}
      <div className="fixed top-0 left-0 w-full h-full -z-50 bg-[url('/wallpaperImg.jpg')] bg-cover bg-center bg-fixed" />

      {/* Sobreposição diagonal */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-background/85 clip-diagonal z-10" />

      {/* Conteúdo sobreposto na imagem */}
      <div className="relative z-40 flex flex-col items-center pt-20">
        <div className="z-30">
          <Navbar />
        </div>
        <h1 className="text-3xl text-primary p-10 text-center">
          Bem-vindo à Cascavel Runners
        </h1>
        <button className="bg-btn-primary py-3 px-5 rounded-2xl text-btn-text cursor-pointer hover:bg-primary/60 active:bg-btn-primary/50 transition duration-500">
          Comce a se desafiar agora!
        </button>
      </div>

      {/* Conteúdo após imagem de fundo */}
      <div className="bg-background h-screen mt-[50vh] p-10 z-30 relative flex flex-col items-center">
        <h2 className="text-2xl text-primary mb-4 animate-bounce">Continue aqui 👇</h2>
        <p className="text-primary text-center mb-6">
          Aqui começa o resto da sua página depois da imagem de fundo.
        </p>
        <button className="bg-btn-primary py-3 px-5 rounded-2xl text-btn-text cursor-pointer hover:bg-primary/60 active:bg-btn-primary/50 transition duration-500">
          Comece
        </button>
      </div>
    </div>
  );
}
