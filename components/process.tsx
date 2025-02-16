"use client"

import { motion } from "framer-motion"
import { Search, Briefcase, ThumbsUp, Car } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Tell us about your dream car and budget. We'll find the perfect match.",
  },
  {
    icon: Briefcase,
    title: "Negotiate",
    description: "Our experts secure the best deal, saving you time and money.",
  },
  {
    icon: ThumbsUp,
    title: "Approve",
    description: "Review and approve the deal with complete transparency.",
  },
  {
    icon: Car,
    title: "Deliver",
    description: "We handle the paperwork and deliver your new car to your doorstep.",
  },
]

export function Process() {
  return (
    <section id="process" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center text-primary mb-16"
        >
          Our <span className="text-secondary">Process</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary">{step.title}</h3>
              </div>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

