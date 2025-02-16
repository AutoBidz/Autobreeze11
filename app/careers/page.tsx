import { CareersHero } from "@/components/careers-hero"
import { WorkingAtAutoBreeze } from "@/components/working-at-autobreeze"
import { CTA } from "@/components/cta"

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-20 bg-white"></div> {/* Spacer to separate header from hero */}
      <CareersHero />
      <WorkingAtAutoBreeze />
      <CTA />
    </div>
  )
}

