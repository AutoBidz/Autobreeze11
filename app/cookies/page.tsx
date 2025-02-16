import { CookiesContent } from "@/components/cookies-content"
import { ShoppingCart } from "@/components/shopping-cart"

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-4 right-4 z-50">
        <ShoppingCart />
      </div>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">Cookie Policy</h1>
        <CookiesContent />
      </div>
    </div>
  )
}

