import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CarBuyingProcessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-primary mb-12">Car Buying Process</h1>
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Step-by-Step Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-4">
              <li>
                <strong>Define Your Preferences:</strong> Tell us about your ideal car, including make, model, features,
                and budget.
              </li>
              <li>
                <strong>Personalized Recommendations:</strong> Our system will provide you with a curated list of
                vehicles that match your criteria.
              </li>
              <li>
                <strong>Expert Consultation:</strong> Schedule a call with our car buying experts to refine your choices
                and answer any questions.
              </li>
              <li>
                <strong>Negotiation:</strong> Once you've selected a car, our team will negotiate the best possible
                price on your behalf.
              </li>
              <li>
                <strong>Financing:</strong> We'll present you with competitive financing options if needed.
              </li>
              <li>
                <strong>Paperwork:</strong> We handle all the necessary documentation to make the process smooth and
                hassle-free.
              </li>
              <li>
                <strong>Delivery:</strong> Your new car is delivered to your doorstep, ready for you to enjoy.
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

