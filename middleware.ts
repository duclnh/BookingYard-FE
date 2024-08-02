import { decode } from 'next-auth/jwt';
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("next-auth.session-token")?.value;
  const currentUser = await decode({
    secret: "xKiTYmrQtbKwLb2gHADYv8RWXfEnWpiL0V+NQZMSatg=",
    token: sessionToken,
  })
  if (currentUser != null && !currentUser?.isVerification && !request.nextUrl.pathname.startsWith('/verify')) {
    return Response.redirect(new URL('/verify', request.url))
  }
  if (currentUser == null && request.nextUrl.pathname.startsWith('/verify')) {
    return Response.redirect(new URL('/sign-in', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}