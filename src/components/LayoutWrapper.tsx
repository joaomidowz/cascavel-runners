"use client"

import { usePathname } from "next/navigation"
import Navbar from "./Navbar"
import NavbarAuthenticated from "./NavbarAuthenticated"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isHome = pathname === "/"
  const isAuthPage = pathname === "/login"

  return (
    <>
      {!isAuthPage && (isHome ? <Navbar /> : <NavbarAuthenticated />)}
      {children}
    </>
  )
}
