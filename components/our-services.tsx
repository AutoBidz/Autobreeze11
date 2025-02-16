"use client"

import { motion } from "framer-motion"
import { CheckCircle, DollarSign, Briefcase, Truck, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    icon: Briefcase,
    title: "Expert Negotiation",
    description: "We leverage industry relationships to secure the best deal possible.",
  },
  {
    icon: DollarSign,
    title: "Financing Assistance",
    description: "We help you compare loan options for the lowest rates.",
  },
  {
    icon: Truck,
    title: "Trade-in Maximization",
    description: "Get top dollar for your current vehicle.",
  },
  {
    icon: CheckCircle,
    title: "Concierge Service",
    description: "From paperwork to delivery, we handle it all.",
  },
]

export function OurServices() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-primary mb-12"
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4"
            >
              <service.icon className="w-8 h-8 text-secondary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/help/contact">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
              <PhoneCall className="w-5 h-5 mr-2" />
              Talk to an Expert
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

