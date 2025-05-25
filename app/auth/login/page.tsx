"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { AuthForm } from "@/components/auth/auth-form"

export default function LoginPage() {
  const router = useRouter()

  const handleSubmit = async (data: { email: string; password: string }) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (result?.error) {
      throw new Error(result.error)
    }

    router.push("/") // Redirigir al dashboard o página principal
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Soporte Técnico Remoto
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sistema de soporte técnico con asistencia por video
          </p>
        </div>
        <AuthForm type="login" onSubmit={handleSubmit} />
      </div>
    </div>
  )
} 