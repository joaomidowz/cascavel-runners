"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiMenu, FiX } from "react-icons/fi"
import Link from "next/link"

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement | null>(null)

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-30 bg-background px-6 py-4 flex justify-between items-center shadow-md">
                <h1 className="text-primary text-xl font-bold">Cascavel Runners</h1>

                <button
                    onClick={() => setOpen(!open)}
                    className="text-btn-primary text-3xl z-40"
                >
                    {open ? <FiX /> : <FiMenu />}
                </button>
            </header>

            <AnimatePresence>
                {open && (
                    <motion.nav
                        key="menu"
                        ref={containerRef}
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1, transition: { duration: 0.2 } }}
                        exit={{ y: -50, opacity: 0, transition: { duration: 0.15 } }}
                        className="fixed top-[64px] right-0 w-full bg-background shadow-md z-20"
                    >
                        <ul className="flex flex-col items-center gap-4 py-6">
                            <li>
                                <Link
                                    href="/login"
                                    className="text-btn-primary text-lg hover:underline"
                                    onClick={() => setOpen(false)}
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/corridas"
                                    className="text-btn-primary text-lg hover:underline"
                                    onClick={() => setOpen(false)}
                                >
                                    Corridas
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/participar"
                                    className="text-btn-primary text-lg hover:underline"
                                    onClick={() => setOpen(false)}
                                >
                                    Participar
                                </Link>
                            </li>
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </>
    )
}
