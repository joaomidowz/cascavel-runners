"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiMenu, FiX } from "react-icons/fi"
import Link from "next/link"

export default function NavbarAuthenticated() {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement | null>(null)

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
                    <Link href="/feed" className="text-primary hover:underline">Feed</Link>
                    <Link href="/perfil" className="text-primary hover:underline">Minha Conta</Link>
                    <button
                        onClick={() => {
                            // logout()
                        }}
                        className="text-primary hover:underline"
                    >
                        Sair
                    </button>
                </nav>
            </header>
            <AnimatePresence>
                {open && (
                    <motion.nav
                        key="auth-menu"
                        ref={containerRef}
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1, transition: { duration: 0.2 } }}
                        exit={{ y: -50, opacity: 0, transition: { duration: 0.15 } }}
                        className="fixed top-[64px] right-0 w-full bg-background shadow-md z-20 md:hidden"
                    >
                        <ul className="flex flex-col items-center gap-4 py-6">
                            <li>
                                <Link
                                    href="/feed"
                                    className="text-primary text-lg hover:underline"
                                    onClick={() => setOpen(false)}
                                >
                                    Feed
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/perfil"
                                    className="text-primary text-lg hover:underline"
                                    onClick={() => setOpen(false)}
                                >
                                    Minha Conta
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        // logout();
                                        setOpen(false)
                                    }}
                                    className="text-primary text-lg hover:underline"
                                >
                                    Sair
                                </button>
                            </li>
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    )
}
