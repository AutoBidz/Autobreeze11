"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah J.",
    role: "First-Time Buyer",
    avatar: "/avatars/sarah-j.jpg",
    content:
      "AutoBreeze made my first car purchase effortless! They explained everything clearly and negotiated an amazing deal. I couldn't be happier!",
    rating: 5,
  },
  {
    name: "Michael C.",
    role: "Busy Professional",
    avatar: "/avatars/michael-c.jpg",
    content:
      "As someone with a hectic schedule, I didn't have time to visit multiple dealerships. AutoBreeze handled everything, from finding the car to delivering it to my doorstep. A lifesaver!",
    rating: 5,
  },
  {
    name: "Emily R.",
    role: "Return Customer",
    avatar: "/avatars/emily-r.jpg",
    content:
      "This is my second time using AutoBreeze, and they exceeded expectations again! They even helped me secure a better loan than I found on my own.",
    rating: 5,
  },
  {
    name: "David T.",
    role: "Family Buyer",
    avatar: "/avatars/david-t.jpg",
    content:
      "We needed a safe, spacious SUV for our growing family. AutoBreeze found the perfect one within our budget and made the entire process seamless.",
    rating: 5,
  },
  {
    name: "Lisa M.",
    role: "Nervous Buyer",
    avatar: "/avatars/lisa-m.jpg",
    content:
      "I was intimidated by the car-buying process, but AutoBreeze made it stress-free. They walked me through everything and secured the best deal possible!",
    rating: 5,
  },
]

export function Testimonials() {
  const [currentIndices, setCurrentIndices] = useState([0, 1, 2])

  const rotateTestimonial = (index: number) => {
    setCurrentIndices((prevIndices) => {
      const newIndices = [...prevIndices]
      newIndices[index] = (newIndices[index] + 1) % testimonials.length
      return newIndices
    })
  }

  useEffect(() => {
    const intervals = [0, 1, 2].map((index) => {
      return setInterval(() => rotateTestimonial(index), 5000 + index * 1000)
    })

    return () => {
      intervals.forEach(clearInterval)
    }
  }, []) // Removed unnecessary dependency: testimonials

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center text-primary mb-12"
        >
          📣 Real People, Real Results
        </motion.h2>
        <div className="grid grid-cols-3 gap-8">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white shadow-lg h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center h-full">
                    <Avatar className="w-16 h-16 border-2 border-secondary mb-4">
                      <AvatarImage
                        src={testimonials[currentIndices[index]].avatar}
                        alt={testimonials[currentIndices[index]].name}
                      />
                      <AvatarFallback>
                        {testimonials[currentIndices[index]].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center mb-2">
                      {[...Array(testimonials[currentIndices[index]].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <motion.p
                      key={currentIndices[index]}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-gray-700 mb-4 flex-grow"
                    >
                      "{testimonials[currentIndices[index]].content}"
                    </motion.p>
                    <div>
                      <h3 className="text-lg font-semibold text-primary">{testimonials[currentIndices[index]].name}</h3>
                      <p className="text-sm text-gray-600">{testimonials[currentIndices[index]].role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

