"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How does AutoBreeze work?",
    answer:
      "AutoBreeze simplifies the car buying process by handling negotiations, paperwork, and delivery on your behalf. You tell us your preferences, we find the best deals, and present you with options. Once you approve, we take care of the rest.",
  },
  {
    question: "Is AutoBreeze available nationwide?",
    answer:
      "Currently, AutoBreeze operates in select major cities across the United States. We're continuously expanding our service area. Check our website or contact our support team to see if we're available in your location.",
  },
  {
    question: "How much does AutoBreeze charge for its services?",
    answer:
      "Our fee structure depends on the package you choose. We offer a basic package with a flat fee and a premium package with additional services. Visit our pricing page for detailed information on our current rates and what's included in each package.",
  },
  {
    question: "Can I trade in my current vehicle through AutoBreeze?",
    answer:
      "Yes, AutoBreeze can handle your trade-in as part of the car buying process. We'll evaluate your current vehicle and factor its value into your new car purchase, making the entire transaction seamless.",
  },
  {
    question: "How long does the car buying process typically take with AutoBreeze?",
    answer:
      "The timeline can vary depending on your specific requirements and vehicle availability. On average, our customers complete their purchases within 1-2 weeks from initial consultation to vehicle delivery.",
  },
  {
    question: "Does AutoBreeze offer financing options?",
    answer:
      "Yes, we work with multiple lenders to offer competitive financing options. Our team can help you explore various loan terms and rates to find the best fit for your budget and credit situation.",
  },
]

export function FAQContent() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className="max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={false}
          animate={{ backgroundColor: activeIndex === index ? "#f3f4f6" : "#ffffff" }}
          className="mb-4 rounded-lg border border-gray-200 overflow-hidden"
        >
          <button
            className="flex justify-between items-center w-full p-4 text-left"
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <span className="font-medium text-primary">{faq.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-primary transition-transform duration-200 ${
                activeIndex === index ? "transform rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence initial={false}>
            {activeIndex === index && (
              <motion.div
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                <div className="p-4 text-gray-700">{faq.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

