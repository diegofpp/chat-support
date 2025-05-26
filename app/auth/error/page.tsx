"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const errorMessages: Record<string, string> = {
    default: "Ocurrió un error durante la autenticación",
    configuration: "Hay un problema con la configuración del servidor",
    accessdenied: "No tienes permiso para acceder",
    verification: "El enlace de verificación ha expirado o es inválido",
    signin: "Error al iniciar sesión",
    oauthsignin: "Error al iniciar sesión con el proveedor",
    oauthcallback: "Error en la respuesta del proveedor de autenticación",
    oauthcreateaccount: "Error al crear la cuenta con el proveedor",
    emailcreateaccount: "Error al crear la cuenta con el email",
    callback: "Error en la respuesta del servidor",
    oauthaccountnotlinked: "El email ya está asociado a otra cuenta",
    emailsignin: "Error al enviar el email de inicio de sesión",
    credentialssignin: "Credenciales inválidas",
    sessionrequired: "Por favor inicia sesión para acceder a esta página",
  }

  const errorMessage = error ? errorMessages[error] || errorMessages.default : errorMessages.default

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Error de Autenticación</CardTitle>
          <CardDescription>
            Ha ocurrido un error durante el proceso de autenticación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            Volver
          </Button>
          <Button asChild>
            <a href="/auth/login">Intentar de nuevo</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function AuthErrorLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[350px]">
        <CardHeader>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full" />
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </CardFooter>
      </Card>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<AuthErrorLoading />}>
      <AuthErrorContent />
    </Suspense>
  )
} 