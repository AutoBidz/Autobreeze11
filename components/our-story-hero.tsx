"use client"

import { motion } from "framer-motion"

export function OurStoryHero() {
  return (
    <section className="relative py-24 bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-[#0047BB]">
            Our <span className="text-[#FF7F27]">Story</span>
          </h1>
          <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            Discover how AutoBreeze came to be and our journey to revolutionize the car buying experience.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

