'use client'

import { Chat } from "@/components/chat"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <main className="border border-blue-500 flex min-h-screen flex-col items-center justify-between p-4 md:px-[10vw] md:py-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Soporte Técnico Remoto</h1>
          <Button 
            onClick={() => router.push('/dashboard')}
            variant="default"
          >
            Mi Perfil
          </Button>
        </div>
        <Chat />
      </div>
    </main>
  )
}
