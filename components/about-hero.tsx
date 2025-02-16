"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export function AboutHero() {
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
            Driving Innovation in <span className="text-[#FF7F27]">Car Buying</span>
          </h1>
          <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            At AutoBreeze, we're revolutionizing the way people buy cars. Our expert team, cutting-edge technology, and
            customer-first approach make car buying simple, transparent, and enjoyable.
          </p>
          <Link href="/our-story">
            <Button size="lg" className="bg-[#FF7F27] hover:bg-[#FF7F27]/90 text-white">
              Discover Our Story <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

