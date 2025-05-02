import Image from "next/image";

export default function Home() {
  return (
   <div className="bg-background h-screen w-screen flex flex-col items-center">
    <h1 className="text-5xl text-primary p-10">Bem-vindo à Cascavel Runners</h1>
    <button className="bg-btn-primary py-4 px-5 rounded-2xl text-btn-text cursor-pointer hover:bg-btn-primary/65 active:bg-orange-400  transition duration-500">Teste do botão</button>
   </div>
  );
}
