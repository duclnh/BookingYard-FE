import { decode } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/profile']
const publicRoutes = ['/',  '/partner', 'contact']
const authenticationRoutes = ['/sign-in', '/sign-up', '/']


export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("next-auth.session-token")?.value;
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
  const isAuthenticationRoutes = publicRoutes.includes(path)

  const currentUser = await decode({
    secret: process.env.NEXTAUTH_SECRET || '',
    token: sessionToken,
  })
  if (currentUser && (new Date() > new Date(currentUser.expiration))) {
    return Response.redirect(new URL('/sign-in'));
  }

  if (currentUser && !currentUser.isVerification && !path.startsWith('/verify')) {
    return Response.redirect(new URL('/verify', request.url));
  }

  if (currentUser && currentUser.isVerification && path.startsWith('/verify')) {
    return Response.redirect(new URL('/not-found', request.url));
  }

  if (currentUser == null && isProtectedRoute) {
    return Response.redirect(new URL('/not-found', request.url));
  }

  // if (!currentUser && pathname.startsWith('/verify')) {
  //   return Response.redirect(new URL('/sign-in', request.url));
  // }

  // Proceed as usual if none of the above conditions are met
}

export const config = {
  matcher: [...protectedRoutes, ...publicRoutes,  ...authenticationRoutes],
};

