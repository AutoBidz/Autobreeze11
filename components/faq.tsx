"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How long does the car buying process typically take with AutoBreeze?",
    answer:
      "The process usually takes 1-2 weeks from start to finish, depending on the complexity of your requirements and vehicle availability.",
  },
  {
    question: "Can I still use AutoBreeze if I have a specific car in mind?",
    answer:
      "We can help you find the best deal on a specific make and model, or assist in exploring similar options that might better suit your needs.",
  },
  {
    question: "Do you handle used cars as well as new ones?",
    answer:
      "Yes, we work with both new and used vehicles. Our team can help you find the best option based on your preferences and budget.",
  },
  {
    question: "What if I'm not satisfied with the deals you present?",
    answer:
      "We strive for 100% customer satisfaction. If you're not happy with the initial options, we'll continue searching and negotiating until we find a deal that meets your expectations.",
  },
  {
    question: "Can AutoBreeze help with car financing?",
    answer:
      "Yes, our Premium package includes financing assistance. We can help you explore various financing options and secure the best rates available to you.",
  },
]

export function FAQ() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center text-primary mb-12"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

