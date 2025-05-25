import NextAuth, { type NextAuthConfig } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { type User } from "@prisma/client"

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<Omit<User, "password"> | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciales inválidas")
        }

        const user = await prisma.user.findUnique({
          where: {
            email: String(credentials.email)
          }
        })

        if (!user || !user.password) {
          throw new Error("Usuario no encontrado")
        }

        const isPasswordValid = await bcrypt.compare(
          String(credentials.password),
          user.password
        )

        if (!isPasswordValid) {
          throw new Error("Contraseña incorrecta")
        }

        const { password, ...userWithoutPassword } = user
        return userWithoutPassword
      }
    })
  ],
  session: {
    strategy: "jwt" as const
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session?.user) {
        session.user.role = token.role
        session.user.id = token.id
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST } 