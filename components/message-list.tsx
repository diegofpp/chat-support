import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  videoUrl?: string
}

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
          <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            <Avatar className="h-8 w-8">
              <AvatarFallback>{message.role === "user" ? "U" : "ST"}</AvatarFallback>
              {message.role === "assistant" && <AvatarImage src="/placeholder.svg?height=32&width=32" />}
            </Avatar>
            <div
              className={`rounded-lg p-3 ${
                message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              {message.videoUrl && (
                <div className="mt-2">
                  <video src={message.videoUrl} controls className="w-full h-auto max-h-40 rounded-md" />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
