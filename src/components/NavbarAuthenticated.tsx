"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function NavbarAuthenticated() {
  const [isOrganizador, setIsOrganizador] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

    if (!usuario) {
      router.push("/");
      return;
    }

    setIsOrganizador(usuario?.nivelPermissao === 1);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    router.push("/");
    router.refresh(); // Garante que o estado seja reiniciado
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-30 bg-background px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-primary text-xl font-bold">Cascavel Runners</h1>

        <button
          onClick={() => setOpen(!open)}
          className="text-btn-primary text-3xl cursor-pointer z-40 md:hidden"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>

        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/feed" className="text-primary hover:underline">Corridas</Link>
          {isOrganizador && (
            <Link href="/create-event" className="text-primary hover:underline">Criar Corrida</Link>
          )}
          <Link href="/profile" className="text-primary hover:underline">Minha Conta</Link>
          <button onClick={handleLogout} className="text-red-500 hover:underline">Sair</button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="menu"
            ref={containerRef}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-[64px] right-0 w-full bg-background shadow-md z-20 md:hidden"
          >
            <ul className="flex flex-col items-center gap-4 py-6">
              <li>
                <Link href="/feed" onClick={() => setOpen(false)} className="text-primary text-lg hover:underline">
                  Corridas
                </Link>
              </li>
              {isOrganizador && (
                <li>
                  <Link href="/create-event" onClick={() => setOpen(false)} className="text-primary text-lg hover:underline">
                    Criar Corrida
                  </Link>
                </li>
              )}
              <li>
                <Link href="/profile" onClick={() => setOpen(false)} className="text-primary text-lg hover:underline">
                  Minha Conta
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="text-red-500 text-lg hover:underline"
                >
                  Sair
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
