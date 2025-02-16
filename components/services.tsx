"use client"

import { motion } from "framer-motion"
import { Handshake, DollarSign, Car } from "lucide-react"

const services = [
  {
    icon: Handshake,
    title: "Expert Negotiation",
    description: "We leverage our expertise to secure the best price for your dream car.",
  },
  {
    icon: DollarSign,
    title: "Financing Assistance",
    description: "Navigate through loan options to find the most favorable terms.",
  },
  {
    icon: Car,
    title: "Trade-in Maximization",
    description: "Get the best value for your current vehicle with our trade-in services.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center text-primary mb-16"
        >
          Our <span className="text-secondary">Services</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-accent p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <service.icon className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

