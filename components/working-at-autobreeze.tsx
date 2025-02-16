"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Users, Zap, Heart } from "lucide-react"

const benefits = [
  {
    icon: Lightbulb,
    title: "Innovation-Driven",
    description: "Work on cutting-edge technology that's changing the automotive industry.",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Join a team that values open communication and diverse perspectives.",
  },
  {
    icon: Zap,
    title: "Fast-Paced Growth",
    description: "Experience rapid professional development in a high-growth startup environment.",
  },
  {
    icon: Heart,
    title: "Comprehensive Benefits",
    description: "Enjoy competitive salaries, health benefits, and work-life balance initiatives.",
  },
]

export function WorkingAtAutoBreeze() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-primary mb-12"
        >
          Working at AutoBreeze
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <benefit.icon className="w-6 h-6 text-secondary mr-2" />
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">Future Opportunities</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            While we don't have any open positions at the moment, we're always interested in connecting with talented
            individuals who are passionate about revolutionizing the car buying experience. Follow us on social media or
            check back here for future opportunities.
          </p>
        </div>
      </div>
    </section>
  )
}

