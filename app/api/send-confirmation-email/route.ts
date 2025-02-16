import { NextResponse } from "next/server"
import { sendMockEmail } from "@/lib/mock-email-sender"

export async function POST(req: Request) {
  try {
    const { email, name, orderDetails } = await req.json()

    if (!email || !name || !orderDetails) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || "noreply@autobreeze.com",
      to: email,
      subject: "Order Confirmation - AutoBreeze",
      text: `Thank you for your order, ${name}! Your order has been confirmed and is being processed.`,
      html: `
        <h1>Thank you for your order, ${name}!</h1>
        <p>Your order has been confirmed and is being processed.</p>
        <h2>Order Details:</h2>
        <ul>
          ${orderDetails.items
            .map(
              (item: any) => `
            <li>${item.name} - $${item.price} x ${item.quantity}</li>
          `,
            )
            .join("")}
        </ul>
        <p><strong>Total: $${orderDetails.total}</strong></p>
        <p>We'll send you another email when your order ships.</p>
      `,
    }

    await sendMockEmail(mailOptions)
    return NextResponse.json({ message: "Confirmation email sent successfully" })
  } catch (error) {
    console.error("Error sending confirmation email:", error)
    return NextResponse.json({ error: "Failed to send confirmation email" }, { status: 500 })
  }
}

