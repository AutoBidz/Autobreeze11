"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Car, DollarSign, Clock, ThumbsUp } from "lucide-react"
import Link from "next/link"

const serviceHighlights = [
  { icon: Car, title: "Expert Vehicle Selection", description: "Find your perfect car" },
  { icon: DollarSign, title: "Negotiation Mastery", description: "Get the best deal possible" },
  { icon: Clock, title: "Time-Saving Process", description: "Efficient and hassle-free" },
  { icon: ThumbsUp, title: "Customer Satisfaction", description: "Your happiness, guaranteed" },
]

export function ServicesHero() {
  return (
    <section className="py-20 bg-gray-100 text-primary overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Revolutionize Your <span className="text-secondary">Car Buying</span> Experience
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-600"
          >
            AutoBreeze offers comprehensive services to make your car purchase smooth, efficient, and tailored to your
            needs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {serviceHighlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <highlight.icon className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-primary">{highlight.title}</h3>
              <p className="text-gray-600">{highlight.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <Link href="#service-packages">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white text-lg px-8 py-4">
              Explore Our Service Packages <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

