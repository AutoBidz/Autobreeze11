import { OurStoryHero } from "@/components/our-story-hero"
import { OurJourney } from "@/components/our-journey"
import { OurVision } from "@/components/our-vision"
import { CTA } from "@/components/cta"
import { ShoppingCart } from "@/components/shopping-cart"

export default function OurStoryPage() {
  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <ShoppingCart />
      </div>
      <OurStoryHero />
      <OurJourney />
      <OurVision />
      <CTA />
    </>
  )
}

