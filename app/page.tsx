import { Chat } from "@/components/chat"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Soporte Técnico Remoto</h1>
        <Chat />
      </div>
    </main>
  )
}
