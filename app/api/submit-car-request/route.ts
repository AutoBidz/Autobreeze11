import { NextResponse } from "next/server"

// Mock email sending function for preview
async function mockSendEmail(to: string, subject: string, body: string) {
  console.log(`Sending email to: ${to}`)
  console.log(`Subject: ${subject}`)
  console.log(`Body: ${body}`)
  return Promise.resolve()
}

export async function POST(request: Request) {
  const formData = await request.json()

  // Send email to client
  await mockSendEmail(
    formData.email,
    "Car Request Confirmation",
    "Thank you for submitting your car request. Our team will review your preferences and get back to you within 24 hours.",
  )

  // Send email to admin
  await mockSendEmail(
    "newcarrequest@autobreeze.net",
    "New Car Request Submitted",
    `A new car request has been submitted. Details: ${JSON.stringify(formData, null, 2)}`,
  )

  return NextResponse.json({ message: "Car request submitted successfully" })
}

