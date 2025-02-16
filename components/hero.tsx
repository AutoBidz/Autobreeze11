"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-orange-50 opacity-50" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container relative px-4 md:px-6 flex flex-col lg:flex-row items-center justify-between gap-12 py-16 lg:py-24">
        {/* Text Content */}
        <motion.div
          className="flex-1 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-blue-50 text-primary font-medium text-sm tracking-wide">
              Welcome to the Future of Car Buying
            </span>
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
              <span className="text-primary block mb-2">AutoBreeze</span>
              <span className="text-secondary text-3xl md:text-4xl lg:text-5xl xl:text-6xl block">
                The World's First
                <br />
                Car Buying Concierge
              </span>
            </h1>
          </div>

          {/* Description */}
          <div className="space-y-4 text-gray-600">
            <p className="text-xl md:text-2xl font-light">Buying a car should be exciting, not exhausting.</p>
            <p className="text-lg md:text-xl leading-relaxed max-w-[600px]">
              🚗 Skip the dealership stress. Save time & money. We handle the negotiations, financing, and paperwork—so
              you drive away happy.
            </p>
          </div>

          {/* CTA Section */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link href="/signup">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-out"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
              </Button>
            </Link>
            <Link href="/services" className="hidden sm:inline-flex">
              <Button
                variant="outline"
                size="lg"
                className="text-primary hover:text-primary/90 text-lg px-8 py-6 rounded-xl border-2 hover:bg-primary/5 transition-colors duration-300"
              >
                Learn More
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center gap-4 pt-4"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
              ))}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold">4.9/5</span> from over <span className="font-semibold">10,000+</span>{" "}
              happy customers
            </div>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          className="flex-1 w-full lg:w-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/happyfamily.jpg-Sb7ZqrNzmlRLXKoaEISZcHKsIWbfbL.jpeg"
              alt="Happy family celebrating at car dealership"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

