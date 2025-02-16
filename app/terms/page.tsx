import { TermsContent } from "@/components/terms-content"
import { ShoppingCart } from "@/components/shopping-cart"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-4 right-4 z-50">
        <ShoppingCart />
      </div>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">Terms of Service</h1>
        <TermsContent />
      </div>
    </div>
  )
}

