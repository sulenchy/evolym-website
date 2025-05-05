import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path starts with /admin
  if (pathname.startsWith("/admin")) {
    const token = await getToken({ req: request })

    // If no token or not an admin role, redirect to sign in
    if (!token || token.role !== "admin") {
      const url = new URL("/auth/signin", request.url)
      url.searchParams.set("callbackUrl", encodeURI(request.url))
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
