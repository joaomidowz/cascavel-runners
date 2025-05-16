"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IoIosArrowBack } from "react-icons/io"
import { useRouter } from "next/navigation"
import OrganizerFormRegister from "@/src/components/OrganizerFormRegister"
import RunnerFormRegister from "@/src/components/RunnerFormRegister"

export default function Register() {
  const [selected, setSelected] = useState<"corredor" | "Organizador" | null>(null)
  const [hasSelectedOnce, setHasSelectedOnce] = useState(false)
  const router = useRouter()

  const handleSelect = (role: "corredor" | "Organizador") => {
    if (!hasSelectedOnce) setHasSelectedOnce(true)
    setSelected(role)
  }

  const getMotionProps = () => {
    if (!hasSelectedOnce) {
      return {
        initial: { opacity: 0, y: -50, rotateY: 90 },
        animate: { opacity: 1, y: 0, rotateY: 0 },
        exit: { opacity: 0, y: 50, rotateY: -90 },
        transition: { duration: 0.6 },
      }
    }

    return {
      initial: { opacity: 0, rotateY: 90 },
      animate: { opacity: 1, rotateY: 0 },
      exit: { opacity: 0, rotateY: -90 },
      transition: { duration: 0.4 },
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center px-4 overflow-x-hidden pb-20">
      <IoIosArrowBack
        className="absolute left-5 top-5 text-2xl cursor-pointer text-gray-700 hover:text-primary transition"
        onClick={() => router.back()}
      />

      <h1 className="text-4xl text-center font-bold py-16 text-">
        Crie sua Conta como:
      </h1>

      <div className="flex flex-row gap-6 justify-center mb-10">
        <button
          className={`btn w-40 transition-all duration-200 ${
            selected === "corredor" ? "bg-primary text-white scale-105" : "bg-gray-100"
          }`}
          onClick={() => handleSelect("corredor")}
        >
          Corredor
        </button>
        <button
          className={`btn w-40 transition-all duration-200 ${
            selected === "Organizador" ? "bg-primary text-white scale-105" : "bg-gray-100"
          }`}
          onClick={() => handleSelect("Organizador")}
        >
          Organizador
        </button>
      </div>

      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          {selected === "corredor" && (
            <motion.div key="corredor" {...getMotionProps()}>
              <RunnerFormRegister />
            </motion.div>
          )}
          {selected === "Organizador" && (
            <motion.div key="Organizador" {...getMotionProps()}>
              <OrganizerFormRegister />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
