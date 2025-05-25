"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthForm } from "@/components/auth/auth-form"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Error al registrar usuario")
      }

      // Redirigir al login después del registro exitoso
      router.push("/auth/login?registered=true")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrar usuario")
      throw err // Re-lanzar para que el AuthForm maneje el estado de carga
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Crear una cuenta
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Únete a nuestro sistema de soporte técnico
          </p>
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <AuthForm type="register" onSubmit={handleSubmit} />
      </div>
    </div>
  )
} 