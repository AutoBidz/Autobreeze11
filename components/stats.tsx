"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState, useEffect } from "react"

const stats = [
  { label: "Happy Customers", value: 10000 },
  { label: "Cars Sold", value: 15000 },
  { label: "Average Savings", value: 3000, prefix: "$" },
  { label: "Expert Negotiators", value: 50 },
]

export function Stats() {
  return (
    <section className="py-24 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatItem({ label, value, prefix = "" }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [count, setCount] = useState(0)

  useEffect(() => {
    if (inView) {
      const start = 0
      const end = Number.parseInt(value)
      const duration = 2000
      let startTimestamp = null

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        setCount(Math.floor(progress * (end - start) + start))
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }

      window.requestAnimationFrame(step)
    }
  }, [inView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold mb-2">
        {prefix}
        {count.toLocaleString()}
        {prefix === "$" && "+"}
      </div>
      <div className="text-xl text-gray-300">{label}</div>
    </motion.div>
  )
}

