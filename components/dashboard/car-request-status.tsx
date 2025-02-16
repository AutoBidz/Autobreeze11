import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function CarRequestStatus({ carRequests }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Car Request Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {carRequests.map((request) => (
            <li key={request.id} className="flex justify-between items-center">
              <span>{request.carModel || "Car Request"}</span>
              <Badge
                variant={
                  request.status === "completed" ? "success" : request.status === "in_progress" ? "warning" : "default"
                }
              >
                {request.status}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

