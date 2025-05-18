"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { VideoUploader } from "@/components/video-uploader"
import { MessageList } from "@/components/message-list"
import { useChat } from "@ai-sdk/react" // Importamos el hook useChat del AI SDK [^1][^2][^4]

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  videoUrl?: string
}

export function Chat() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null)
  const { messages, input, handleInputChange, handleSubmit } = useChat() // Utilizamos el hook useChat [^1][^2][^4]
  const [customMessages, setCustomMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Bienvenido al soporte técnico remoto. Por favor, describa su problema y suba un video si es necesario para que nuestros técnicos puedan ayudarle mejor.",
    },
  ])

  const handleVideoUpload = (file: File) => {
    setVideoFile(file)
    const url = URL.createObjectURL(file)
    setVideoPreviewUrl(url)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() && !videoFile) return

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      videoUrl: videoPreviewUrl || undefined,
    }

    setCustomMessages((prev) => [...prev, newMessage])

    // Agregar mensaje de confirmación del sistema
    setTimeout(() => {
      setCustomMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "Hemos recibido su consulta. Un técnico especializado revisará su caso pronto y le proporcionará una solución. Gracias por su paciencia.",
        },
      ])
    }, 1000)

    // Limpiar el formulario
    setVideoFile(null)
    setVideoPreviewUrl(null)

    // Limpiar el input usando la función del hook useChat
    handleInputChange({ target: { value: "" } } as React.ChangeEvent<HTMLTextAreaElement>)
  }

  return (
    <div className="flex flex-col h-[80vh] border rounded-lg overflow-hidden bg-white">
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={customMessages} />
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {videoPreviewUrl && (
            <div className="relative">
              <video src={videoPreviewUrl} controls className="w-full h-auto max-h-60 rounded-md" />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => {
                  setVideoFile(null)
                  setVideoPreviewUrl(null)
                }}
              >
                Eliminar
              </Button>
            </div>
          )}

          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Describa su problema técnico aquí..."
            className="min-h-24 resize-none"
          />

          <div className="flex items-center justify-between">
            <VideoUploader onUpload={handleVideoUpload} />
            <Button type="submit">Enviar consulta</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
