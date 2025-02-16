import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Force the route to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic"
export const maxDuration = 30
export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    messages,
  })
  return result.toDataStreamResponse()
}

