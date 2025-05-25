import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
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