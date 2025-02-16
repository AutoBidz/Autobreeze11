import { CarRequestForm } from "@/components/car-request-form"
import { ShoppingCart } from "@/components/shopping-cart"

export default function RequestCarPage() {
  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <ShoppingCart />
      </div>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-primary mb-12">Request Your Dream Car</h1>
          <CarRequestForm />
        </div>
      </div>
    </>
  )
}

