import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"
import { WhyChooseUs } from "@/components/why-choose-us"
import { CarTypes } from "@/components/car-types"
import { ShoppingCart } from "@/components/shopping-cart"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-50">
        <ShoppingCart />
      </div>
      <Hero />
      <HowItWorks />
      <Features />
      <WhyChooseUs />
      <CarTypes />
      <Testimonials />
      <CTASection />
    </main>
  )
}

