import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AccountBillingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-primary mb-12">Account & Billing</h1>
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Managing Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Here's how you can manage your AutoBreeze account:</p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Update your personal information</li>
              <li>Change your password</li>
              <li>Set communication preferences</li>
              <li>View your car buying history</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Understanding our billing process:</p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>AutoBreeze charges a flat fee for our car buying service</li>
              <li>The fee is only charged once you've successfully purchased a car</li>
              <li>We offer transparent pricing with no hidden costs</li>
              <li>You can view your billing history in your account dashboard</li>
              <li>For any billing inquiries, please contact our support team</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

