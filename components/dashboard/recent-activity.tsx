import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivity({ carRequests }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {carRequests.map((request) => (
            <li key={request.id} className="flex justify-between items-center">
              <span>{request.carModel || "Car Request"}</span>
              <span className="text-sm text-gray-500">
                {new Date(request.createdAt.seconds * 1000).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

