import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GettingStartedPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-primary mb-12">Getting Started with AutoBreeze</h1>
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Welcome to AutoBreeze</CardTitle>
          </CardHeader>
          <CardContent>
            <p>AutoBreeze is here to revolutionize your car buying experience. Here's how to get started:</p>
            <ol className="list-decimal list-inside mt-4 space-y-2">
              <li>Create an account on our platform</li>
              <li>Fill out your car preferences and requirements</li>
              <li>Browse our curated selection of vehicles</li>
              <li>Request more information or schedule a test drive</li>
              <li>Let our experts handle the negotiations and paperwork</li>
              <li>Enjoy your new car!</li>
            </ol>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Personalized car recommendations</li>
              <li>Expert negotiation on your behalf</li>
              <li>Transparent pricing and no hidden fees</li>
              <li>Convenient at-home test drives</li>
              <li>Streamlined financing options</li>
              <li>Hassle-free delivery to your doorstep</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

