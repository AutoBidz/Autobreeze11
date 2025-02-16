import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function POST(req: Request) {
  const { email, name, cartItems } = await req.json()

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Complete Your Purchase - AutoBreeze",
    html: `
      <h1>Hello ${name},</h1>
      <p>We noticed you left some items in your cart. Don't miss out on these great deals!</p>
      <h2>Your Cart:</h2>
      <ul>
        ${cartItems
          .map(
            (item: any) => `
          <li>${item.name} - $${item.price}</li>
        `,
          )
          .join("")}
      </ul>
      <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/checkout">Click here to complete your purchase</a></p>
      <p>If you have any questions, please don't hesitate to contact our support team.</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ message: "Reminder email sent successfully" })
  } catch (error) {
    console.error("Error sending reminder email:", error)
    return NextResponse.json({ error: "Failed to send reminder email" }, { status: 500 })
  }
}

