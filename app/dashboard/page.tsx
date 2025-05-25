'use client'

import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>
              Bienvenido al panel de control
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Email:</p>
              <p className="font-medium">{session?.user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Rol:</p>
              <p className="font-medium">{session?.user?.role}</p>
            </div>
            <Button 
              variant="destructive" 
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
            >
              Cerrar sesión
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 