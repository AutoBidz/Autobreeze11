"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Car, Zap, Home } from "lucide-react"
import Link from "next/link"

const carTypes = [
  {
    icon: Car,
    title: "New & Used Vehicles",
    description: "A vast selection, fully vetted.",
  },
  {
    icon: Zap,
    title: "Luxury & Exotic Cars",
    description: "Premium selections at unbeatable prices.",
  },
  {
    icon: Car,
    title: "Electric & Hybrid",
    description: "The best EV and hybrid deals.",
  },
  {
    icon: Home,
    title: "Family-Friendly SUVs & Sedans",
    description: "Safe, spacious, and affordable.",
  },
]

export function CarTypes() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-primary mb-12"
        >
          🚘 What Type of Car Do You Need?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {carTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 p-6 rounded-lg shadow-md flex items-start space-x-4"
            >
              <div className="flex-shrink-0">
                <span className="text-2xl">🔹</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">{type.title}</h3>
                <p className="text-gray-600">{type.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/signup">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-semibold text-lg px-8 py-6">
              👉 Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

