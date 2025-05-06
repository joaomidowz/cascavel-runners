"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import RunnerForm from "@/src/components/RunnerForm"
import OrganizerForm from "@/src/components/OrganizerForm"
import Footer from "@/src/components/Footer"
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation"

export default function Login() {
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
        initial: { y: -100, rotateY: 180 },
        animate: { y: 0, rotateY: 0 },
        exit: { y: 100, rotateY: -180 },
        transition: { duration: 0.8 },
      }
    }

    return {
      initial: { rotateY: 180 },
      animate: { rotateY: 0 },
      exit: { rotateY: -180 },
      transition: { duration: 0.35 },
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-hidden">
      <IoIosArrowBack className="absolute left-5 top-5 text-2xl" onClick={() => router.back()} />
      <h1 className="text-4xl text-center py-20">Faça Login Como</h1>

      <div className="flex flex-row gap-10">
        <button className="btn w-36" onClick={() => handleSelect("corredor")}>Corredor</button>
        <button className="btn w-36" onClick={() => handleSelect("Organizador")}>Organizador</button>
      </div>

      <div className="mt-10 relative w-full max-w-md h-96 perspective mb-10">
        <AnimatePresence mode="wait">
          {selected === "corredor" && (
            <motion.div key="corredor" {...getMotionProps()} className="absolute w-full h-full">
              <RunnerForm />
            </motion.div>
          )}
          {selected === "Organizador" && (
            <motion.div key="Organizador" {...getMotionProps()} className="absolute w-full h-full">
              <OrganizerForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  )
}
