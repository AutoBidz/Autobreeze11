import axios from "axios"
import { config } from "./config"

const hostingerApi = axios.create({
  baseURL: "https://api.hostinger.com/v1", // Replace with the actual Hostinger API URL
  auth: {
    username: config.hostinger.email || "",
    password: config.hostinger.password || "",
  },
})

export async function createHostingerEmail(email: string, password: string) {
  if (!config.hostinger.email || !config.hostinger.password) {
    throw new Error("Hostinger credentials are not set in the environment variables")
  }

  try {
    const response = await hostingerApi.post("/emails", { email, password })
    return response.data
  } catch (error) {
    console.error("Error creating Hostinger email:", error)
    throw error
  }
}

