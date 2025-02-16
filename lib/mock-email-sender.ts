// Mock email sender for demonstration purposes

export async function sendMockEmail(options: {
  from: string
  to: string
  subject: string
  text: string
  html: string
}) {
  // Simulate a delay to mimic email sending
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Log the email details
  console.log("Mock Email Sent:")
  console.log("From:", options.from)
  console.log("To:", options.to)
  console.log("Subject:", options.subject)
  console.log("Text:", options.text)
  console.log("HTML:", options.html)

  // Return a success response
  return { messageId: `mock-${Date.now()}` }
}

