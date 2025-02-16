import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ThankYou() {
  return (
    <div className="text-center py-16">
      <h2 className="text-3xl font-bold mb-4">Thank You for Your Request!</h2>
      <p className="text-xl mb-8">
        We've received your car request and our team will be in touch within 24 hours to discuss your preferences and
        next steps.
      </p>
      <Link href="/dashboard">
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  )
}

