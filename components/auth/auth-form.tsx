"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

// Esquema de validación para el formulario
const authSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

type AuthFormProps = {
  type: "login" | "register"
  onSubmit: (data: z.infer<typeof authSchema>) => Promise<void>
}

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
  })

  const handleFormSubmit = async (data: z.infer<typeof authSchema>) => {
    try {
      setError(null)
      setIsLoading(true)
      await onSubmit(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>{type === "login" ? "Iniciar Sesión" : "Registrarse"}</CardTitle>
        <CardDescription>
          {type === "login"
            ? "Ingresa tus credenciales para acceder"
            : "Crea una cuenta para comenzar"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              {...register("email")}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {type === "login" ? "Iniciar Sesión" : "Registrarse"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          {type === "login" ? (
            <>
              ¿No tienes una cuenta?{" "}
              <a href="/auth/register" className="text-primary hover:underline">
                Regístrate
              </a>
            </>
          ) : (
            <>
              ¿Ya tienes una cuenta?{" "}
              <a href="/auth/login" className="text-primary hover:underline">
                Inicia sesión
              </a>
            </>
          )}
        </p>
      </CardFooter>
    </Card>
  )
} 