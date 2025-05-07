"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

type Direction = "up" | "down" | "left" | "right"

const variants: Record<Direction, any> = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 },
}

export default function Reveal({
    children,
    direction = "up",
    duration = 0.8,
    delay = 0,
}: {
    children: React.ReactNode
    direction?: Direction
    duration?: number
    delay?: number
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    return (
        <motion.div
            ref={ref}
            initial={variants[direction]}
            animate={isInView ? { x: 0, y: 0, opacity: 1 } : {}}
            transition={{ duration, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    )
}
