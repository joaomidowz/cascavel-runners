"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NavbarAuthenticated from "./NavbarAuthenticated";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAuthPage = ["/login", "/register"].includes(pathname);
  const isHome = pathname === "/";

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      {!isAuthPage && (
        isLoggedIn ? <NavbarAuthenticated /> : <Navbar />
      )}
      {children}
    </>
  );
}
