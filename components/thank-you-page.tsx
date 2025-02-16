import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ThankYouPage() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Thank You for Your Request!</h2>
      <p className="text-xl mb-8">
        We've received your car request and our team will review it shortly. We'll be in touch within 24 hours to
        discuss your preferences and next steps.
      </p>
      <p className="mb-8">
        If you have any immediate questions, please don't hesitate to contact us at{" "}
        <a href="mailto:support@autobreeze.com" className="text-primary hover:underline">
          support@autobreeze.com
        </a>
        .
      </p>
      <Link href="/">
        <Button>Return to Home</Button>
      </Link>
    </div>
  )
}

