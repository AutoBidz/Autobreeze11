"use client"

import { motion } from "framer-motion"

export function CareersHero() {
  return (
    <section className="relative py-24 bg-primary text-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Join the <span className="text-secondary">AutoBreeze</span> Team
          </h1>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Help us revolutionize the car buying experience and shape the future of automotive retail.
          </p>
          <p className="text-lg text-gray-200">
            We're always looking for talented individuals to join our team. While we don't have any open positions right
            now, check back soon for exciting opportunities!
          </p>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/50" />
    </section>
  )
}

