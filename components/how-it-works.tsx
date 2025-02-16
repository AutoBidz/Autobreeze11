"use client"

import { motion } from "framer-motion"
import { MessageSquare, Search, FileText, Car } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    title: "Tell Us Your Dream Car",
    description: "Share your budget, preferences, and must-haves.",
  },
  {
    icon: Search,
    title: "We Find & Negotiate",
    description: "Our experts secure the best deal—no hassle, no haggling, just the right car at the right price.",
  },
  {
    icon: FileText,
    title: "Review & Approve",
    description: "We present unbeatable offers. You decide.",
  },
  {
    icon: Car,
    title: "Drive Away Happy",
    description: "Enjoy your new car with zero stress.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-primary mb-12"
        >
          How AutoBreeze Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <div className="mb-4">
                <step.icon className="w-12 h-12 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

