import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AdminActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        <Link href="/admin/invite">
          <Button className="w-full">Invite New Admin</Button>
        </Link>
        <Link href="/admin/car-requests">
          <Button className="w-full" variant="outline">
            View All Car Requests
          </Button>
        </Link>
        <Link href="/admin/users">
          <Button className="w-full" variant="outline">
            Manage Users
          </Button>
        </Link>
        <Link href="/admin/settings">
          <Button className="w-full" variant="outline">
            Admin Settings
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

