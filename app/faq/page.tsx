import { FAQContent } from "@/components/faq-content"
import { CTA } from "@/components/cta"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">Frequently Asked Questions</h1>
        <FAQContent />
      </div>
      <CTA />
    </div>
  )
}

