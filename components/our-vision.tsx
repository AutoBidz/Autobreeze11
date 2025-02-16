"use client"

import { motion } from "framer-motion"

export function OurVision() {
  return (
    <section className="py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0047BB] mb-6">Our Vision</h2>
          <p className="text-xl text-gray-600 mb-8">
            At AutoBreeze, we envision a world where buying a car is as easy and enjoyable as driving one. We're
            committed to leveraging technology and human expertise to create a car buying experience that's transparent,
            efficient, and tailored to each individual's needs.
          </p>
          <p className="text-xl text-gray-600">
            Our goal is to continue innovating and expanding our services, always putting our customers first and
            striving to make car ownership accessible and stress-free for everyone.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

