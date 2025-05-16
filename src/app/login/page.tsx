"use client"

import LoginForm from "@/src/components/LoginForm"
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-hidden">
      <IoIosArrowBack className="absolute left-5 top-5 text-2xl" onClick={() => router.back()} />
      <h1 className="text-4xl text-center py-20">Faça Login</h1>

      <div className="mt-10 relative w-full max-w-md mb-10">
        <LoginForm />
      </div>
    </div>
  )
}
