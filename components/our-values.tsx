"use client"

import { motion } from "framer-motion"
import { Shield, Users, Zap, Heart } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We operate with honesty and transparency in all our dealings.",
  },
  {
    icon: Users,
    title: "Customer-Centric",
    description: "Our customers' needs and satisfaction are at the heart of everything we do.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We continuously seek new ways to improve and streamline the car buying process.",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "We're passionate about cars and helping people find their perfect vehicle.",
  },
]

export function OurValues() {
  return (
    <section className="py-24 bg-accent">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center text-primary mb-12"
        >
          Our Values
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <value.icon className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

