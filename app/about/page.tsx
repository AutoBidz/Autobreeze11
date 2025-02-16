import { AboutHero } from "@/components/about-hero"
import { OurMission } from "@/components/our-mission"
import { OurValues } from "@/components/our-values"
import { OurTeam } from "@/components/our-team"
import { CTA } from "@/components/cta"
import { ShoppingCart } from "@/components/shopping-cart"

export default function AboutPage() {
  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <ShoppingCart />
      </div>
      <AboutHero />
      <OurMission />
      <OurValues />
      <OurTeam />
      <CTA />
    </>
  )
}

