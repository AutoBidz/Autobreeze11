"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-24 bg-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 bg-white rounded-2xl p-12 shadow-2xl"
        >
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Ready to Transform Your Car Buying Experience?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of happy customers who found their perfect car through AutoBreeze. Start your journey
              today!
            </p>
            <Link href="/request-car">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white text-lg px-12 py-6">
                Get Started Now
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

