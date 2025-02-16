import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AccountOverview({ user }) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Account Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {user?.displayName}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Member Since:</strong>{" "}
            {user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "N/A"}
          </p>
        </div>
        <div className="mt-4">
          <Link href="/account-settings">
            <Button variant="outline">Edit Account Settings</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

