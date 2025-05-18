"use client"

import { type ChangeEvent, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface VideoUploaderProps {
  onUpload: (file: File) => void
}

export function VideoUploader({ onUpload }: VideoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onUpload(file)
    }
  }

  return (
    <div>
      <input type="file" accept="video/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
      <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
        <Upload className="mr-2 h-4 w-4" />
        Subir video
      </Button>
    </div>
  )
}
