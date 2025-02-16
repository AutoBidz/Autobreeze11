"use client"

import { motion } from "framer-motion"
import { Search, DollarSign, FileText, Truck, Briefcase, Headphones } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Extensive Vehicle Search",
    description: "Access to a wide range of vehicles matching your preferences and budget.",
  },
  {
    icon: DollarSign,
    title: "Price Comparison",
    description: "Comprehensive market analysis to ensure you get the best deal possible.",
  },
  {
    icon: Briefcase,
    title: "Expert Negotiation",
    description: "Our team of skilled negotiators work to secure the best price for you.",
  },
  {
    icon: FileText,
    title: "Paperwork Handling",
    description: "We take care of all the necessary documentation, making the process hassle-free.",
  },
  {
    icon: Truck,
    title: "Delivery Coordination",
    description: "Convenient delivery of your new vehicle right to your doorstep.",
  },
  {
    icon: Headphones,
    title: "Ongoing Support",
    description: "Dedicated customer support throughout your car buying journey and beyond.",
  },
]

export function ServiceFeatures() {
  return (
    <section className="py-24 bg-accent">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center text-primary mb-12"
        >
          Our Service Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <feature.icon className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

