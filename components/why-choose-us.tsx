"use client"

import { motion } from "framer-motion"
import { DollarSign, Clock, Shield, Car, Search, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const reasons = [
  {
    icon: DollarSign,
    title: "Save Thousands",
    description: "Our expert negotiators secure below-market prices on your behalf.",
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "Forget multiple dealership visits. We handle everything.",
  },
  {
    icon: Shield,
    title: "Stress-Free & Transparent",
    description: "No hidden fees. No pressure. Just smart car buying.",
  },
  {
    icon: Car,
    title: "Personalized Car Matches",
    description: "Handpicked options tailored to your needs.",
  },
  {
    icon: Search,
    title: "Expert Insights",
    description: "Our industry specialists guide you every step of the way.",
  },
  {
    icon: Zap,
    title: "Fast & Seamless Process",
    description: "Get your car quickly, without the usual headaches.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-primary mb-12"
        >
          Why Choose AutoBreeze?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <div className="mb-4 flex justify-center">
                <reason.icon className="w-12 h-12 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/contact" passHref>
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

