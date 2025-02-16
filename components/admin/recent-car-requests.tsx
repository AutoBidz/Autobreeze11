"use client"

import { useState, useEffect } from "react"
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/date-utils"

export function RecentCarRequests() {
  const [carRequests, setCarRequests] = useState([])

  useEffect(() => {
    const fetchCarRequests = async () => {
      const q = query(collection(db, "carRequests"), orderBy("createdAt", "desc"), limit(5))
      const querySnapshot = await getDocs(q)
      const requests = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setCarRequests(requests)
    }

    fetchCarRequests()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Car Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Car Model</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {carRequests.map((request: any) => (
              <TableRow key={request.id}>
                <TableCell>{request.userEmail}</TableCell>
                <TableCell>{request.carModel || "N/A"}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>{formatDate(request.createdAt.toDate())}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

