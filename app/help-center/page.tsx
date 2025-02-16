import { HelpCenterContent } from "@/components/help-center-content"
import { AIChatbot } from "@/components/ai-chatbot"
import { CTA } from "@/components/cta"

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">Help Center</h1>
        <HelpCenterContent />
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center text-primary mb-6">AI Assistant</h2>
          <AIChatbot />
        </div>
      </div>
      <CTA />
    </div>
  )
}

