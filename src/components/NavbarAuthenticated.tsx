"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavbarAuthenticated() {
  const [isOrganizador, setIsOrganizador] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
    setIsOrganizador(usuario?.nivelPermissao === 1);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-background px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-primary text-xl font-bold">Cascavel Runners</h1>
      <nav className="flex gap-6 items-center">
        <Link href="/feed" className="text-primary hover:underline">Corridas</Link>
        {isOrganizador && <Link href="/create-event" className="text-primary hover:underline">Criar Corrida</Link>}
        <Link href="/conta" className="text-primary hover:underline">Minha Conta</Link>
        <button onClick={handleLogout} className="text-red-500 hover:underline">Sair</button>
      </nav>
    </header>
  );
}
