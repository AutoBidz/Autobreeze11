"use client"

import { motion } from "framer-motion"

export function OurMission() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8">
            At AutoBreeze, our mission is to transform the car buying experience by providing expert guidance,
            leveraging cutting-edge technology, and prioritizing customer satisfaction. We aim to make the process of
            purchasing a vehicle as smooth, transparent, and enjoyable as possible.
          </p>
          <p className="text-xl text-gray-600">
            We believe that everyone deserves to drive their dream car without the stress and hassle traditionally
            associated with car buying. By handling negotiations, paperwork, and logistics, we free our customers to
            focus on what matters most: finding the perfect vehicle for their needs and lifestyle.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

