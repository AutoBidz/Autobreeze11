import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FinancingInsurancePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-primary mb-12">Financing & Insurance</h1>
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Financing Options</CardTitle>
          </CardHeader>
          <CardContent>
            <p>AutoBreeze offers various financing options to suit your needs:</p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Traditional auto loans through our partner banks</li>
              <li>Lease options for qualified buyers</li>
              <li>Special financing programs for first-time buyers</li>
              <li>Refinancing options for your current vehicle</li>
            </ul>
            <p className="mt-4">
              Our team will work with you to find the best financing solution based on your credit score, down payment,
              and budget.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Insurance Partnerships</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We've partnered with leading insurance providers to offer comprehensive coverage:</p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Multiple insurance quotes from top providers</li>
              <li>Customizable coverage options</li>
              <li>Bundled discounts for auto and home insurance</li>
              <li>Assistance with policy selection and setup</li>
            </ul>
            <p className="mt-4">
              Our insurance specialists can help you choose the right coverage to protect your new vehicle and give you
              peace of mind.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

