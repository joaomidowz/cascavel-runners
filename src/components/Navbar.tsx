"use client";

import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

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
        <nav className="hidden md:flex gap-8">
          <Link href="/login" className="text-primary hover:underline">Login</Link>
          <Link href="/feed" className="text-primary hover:underline">Corridas</Link>
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
              <li><Link href="/login" onClick={() => setOpen(false)} className="text-primary text-lg hover:underline">Login</Link></li>
              <li><Link href="/feed" onClick={() => setOpen(false)} className="text-primary text-lg hover:underline">Corridas</Link></li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
