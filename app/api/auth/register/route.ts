import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import * as z from "zod"

const prisma = new PrismaClient()

// Esquema de validación
const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = registerSchema.parse(body)

    // Mostrar la URL de conexión que Prisma está usando
    console.log("DATABASE_URL utilizada por Prisma:", process.env.DATABASE_URL);
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "El usuario ya existe" },
        { status: 400 }
      )
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: email.split("@")[0], // Nombre temporal basado en el email
        role: "USER", // Rol por defecto
      },
    })

    // No devolver la contraseña en la respuesta
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      { message: "Usuario creado exitosamente", user: userWithoutPassword },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Datos inválidos", errors: error.errors },
        { status: 400 }
      )
    }

    console.error("Error en el registro:", error)
    return NextResponse.json(
      { message: "Error al crear el usuario" },
      { status: 500 }
    )
  }
} 