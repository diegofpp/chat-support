import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Permitir respuestas de streaming de hasta 30 segundos
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = streamText({
    model: openai("gpt-4o"),
    messages,
  })
  return result.toDataStreamResponse()
}
