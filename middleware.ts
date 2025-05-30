import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl
    // Protección de ruta /tecnico solo para técnicos
    if (pathname.startsWith("/tecnico")) {
      const token = await getToken({ req })
      if (!token || token.role !== "TECHNICIAN") {
        const url = req.nextUrl.clone()
        url.pathname = "/dashboard"
        return NextResponse.redirect(url)
      }
    }
    // Add custom middleware logic here if needed
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: "/auth/login",
    },
  }
)

// Protect all routes under /dashboard and /api except auth routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/:path*",
    "/((?!api/auth|auth/login|auth/register|auth/error|_next/static|_next/image|favicon.ico).*)",
  ]
}