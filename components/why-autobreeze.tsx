"use client"

import { motion } from "framer-motion"
import { Clock, DollarSign, Shield, ThumbsUp, Zap, HeartHandshake } from "lucide-react"

const reasons = [
  {
    icon: Clock,
    title: "Save Time",
    description: "Skip lengthy dealership visits. We handle negotiations while you relax.",
  },
  {
    icon: DollarSign,
    title: "Save Money",
    description: "Our expert negotiators secure the best deals, often below market value.",
  },
  {
    icon: Shield,
    title: "Stress-Free Process",
    description: "Experience a smooth, transparent car buying journey from start to finish.",
  },
  {
    icon: ThumbsUp,
    title: "Expert Guidance",
    description: "Benefit from our team's extensive knowledge of the auto industry.",
  },
  {
    icon: Zap,
    title: "Fast Results",
    description: "Get your dream car quicker with our efficient, streamlined process.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Service",
    description: "Receive tailored recommendations based on your specific needs and preferences.",
  },
]

export function WhyAutoBreeze() {
  return (
    <section className="py-24 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center text-primary mb-12"
        >
          Why You Should Use <span className="text-secondary">AutoBreeze</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-accent p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <reason.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary">{reason.title}</h3>
              </div>
              <p className="text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

