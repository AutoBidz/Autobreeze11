"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, FileText, MessageCircle, PhoneCall } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const helpTopics = [
  {
    title: "Getting Started",
    icon: FileText,
    description: "Learn the basics of using AutoBreeze and start your car buying journey.",
    link: "/help/getting-started",
  },
  {
    title: "Account & Billing",
    icon: FileText,
    description: "Manage your account settings and understand our billing process.",
    link: "/help/account-billing",
  },
  {
    title: "Car Buying Process",
    icon: FileText,
    description: "Understand each step of the AutoBreeze car buying experience.",
    link: "/help/car-buying-process",
  },
  {
    title: "Financing & Insurance",
    icon: FileText,
    description: "Learn about our financing options and insurance partnerships.",
    link: "/help/financing-insurance",
  },
]

export function HelpCenterContent() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for help..."
            className="pl-10 pr-4 py-2 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {helpTopics.map((topic, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link
              href={topic.link}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <topic.icon className="w-8 h-8 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">{topic.title}</h2>
              <p className="text-gray-600 mb-4">{topic.description}</p>
              <Button variant="outline">Learn More</Button>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Need more help?</h2>
        <div className="flex justify-center space-x-4">
          <Link href="/help/chat">
            <Button variant="outline" className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with Us
            </Button>
          </Link>
          <Link href="/help/contact">
            <Button variant="outline" className="flex items-center">
              <PhoneCall className="w-5 h-5 mr-2" />
              Call Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

