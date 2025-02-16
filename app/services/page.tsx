import { ServicesHero } from "@/components/services-hero"
import { ServicePackages } from "@/components/service-packages"
import { ServiceFeatures } from "@/components/service-features"
import { FAQ } from "@/components/faq"
import { CTA } from "@/components/cta"
import { ShoppingCart } from "@/components/shopping-cart"

export default function ServicesPage() {
  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <ShoppingCart />
      </div>
      <ServicesHero />
      <ServicePackages />
      <ServiceFeatures />
      <FAQ />
      <CTA />
    </>
  )
}

