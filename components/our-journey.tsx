"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const milestones = [
  {
    year: "2020",
    title: "The Launch",
    description:
      "AutoBreeze was born from a vision to revolutionize car buying. We launched our platform, offering a streamlined process to our first customers.",
  },
  {
    year: "2021",
    title: "Rapid Growth",
    description:
      "Despite global challenges, we expanded our services and partnerships, reaching more customers across the country.",
  },
  {
    year: "2022",
    title: "Innovation",
    description:
      "We introduced AI-powered recommendations and virtual showrooms, enhancing the online car buying experience.",
  },
  {
    year: "2023",
    title: "Market Leader",
    description: "AutoBreeze became a household name, trusted by thousands for hassle-free car buying.",
  },
  {
    year: "2024",
    title: "Expansion",
    description:
      "We expanded our services to include more vehicle types and introduced new financing options for our customers.",
  },
  {
    year: "2025",
    title: "The Future",
    description:
      "As we continue to grow, our focus remains on innovation and making car buying even simpler and more enjoyable.",
  },
]

export function OurJourney() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-[#0047BB] mb-12"
        >
          Our Journey
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{milestone.title}</span>
                    <span className="text-[#FF7F27]">{milestone.year}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{milestone.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

