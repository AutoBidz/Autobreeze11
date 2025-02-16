import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import fetch from "node-fetch"

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
})

const db = getFirestore()

async function sendReminderEmails() {
  const now = new Date()
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  try {
    const snapshot = await db.collection("abandonedCarts").where("createdAt", "<=", twentyFourHoursAgo).get()

    for (const doc of snapshot.docs) {
      const cartData = doc.data()
      const { userId, items, total } = cartData

      // Fetch user data
      const userDoc = await db.collection("users").doc(userId).get()
      const userData = userDoc.data()

      if (userData) {
        const { email, name } = userData

        // Send reminder email
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-reminder-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            name,
            cartItems: items,
          }),
        })

        console.log(`Reminder email sent to ${email}`)
      }
    }

    console.log("Reminder emails sent successfully")
  } catch (error) {
    console.error("Error sending reminder emails:", error)
  }
}

// Run the function
sendReminderEmails()

