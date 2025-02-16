"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const teamMembers = [
  {
    name: "John Doe",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Jane Smith",
    role: "Head of Negotiations",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Mike Johnson",
    role: "Chief Technology Officer",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Sarah Brown",
    role: "Customer Experience Manager",
    image: "/placeholder.svg?height=400&width=400",
  },
]

export function OurTeam() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center text-primary mb-12"
        >
          Meet Our Team
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-accent p-6 rounded-lg shadow-lg text-center"
            >
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                width={200}
                height={200}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-primary mb-2">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

