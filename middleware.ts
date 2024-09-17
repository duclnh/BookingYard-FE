import { decode } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
// '/profile'
const protectedRoutes = ['']
const publicRoutes = ['/', '/partner', '/contact','/booking']
const ownerRoutes = ['/admin/owner/dashboard',
                    '/admin/owner/booking',
                    '/admin/owner/check-in',
                    '/admin/owner/court',
                    '/admin/owner/feedback',
                    '/admin/owner/schedule',
                    '/admin/owner/staff',
                    '/admin/owner/voucher']
const adminRoutes = ['/admin/company/dashboard',
                    '/admin/company/booking',
                    '/admin/company/check-in',
                    '/admin/company/court',
                    '/admin/company/feedback',
                    '/admin/company/schedule',
                    '/admin/company/staff',
                    '/admin/company/facility',
                    '/admin/company/voucher']
const authenticationRoutes = ['/sign-in', 
                              '/admin/sign-in', 
                              '/sign-up', 
                              '/verify', 
                              '/forget-password', 
                              '/admin/forget-password']


export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("next-auth.session-token")?.value;
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
  const isOwnerRoute = ownerRoutes.includes(path)
  const isAuthenticationRoutes = authenticationRoutes.includes(path)
  const isAdminRoutes = adminRoutes.includes(path)

  const currentUser = await decode({
    secret: process.env.NEXTAUTH_SECRET || '',
    token: sessionToken,
  })

  if (currentUser && currentUser.role == "Customer" && (new Date() > new Date(currentUser.expiration) && !isAuthenticationRoutes)) {
    console.log("1")
    return Response.redirect(new URL('/sign-in', request.url));
  }

  if (currentUser && currentUser.role != "Customer" && (new Date() > new Date(currentUser.expiration) && !isAuthenticationRoutes)) {
    console.log("2")
    return Response.redirect(new URL('/admin/sign-in', request.url));
  }

  if ((isAdminRoutes || isOwnerRoute) && currentUser == null && !isAuthenticationRoutes) {
    console.log("3")
    return Response.redirect(new URL('/admin/sign-in', request.url));
  }

  if (isProtectedRoute && currentUser == null && !isAuthenticationRoutes) {
    console.log("4")
    return Response.redirect(new URL('/sign-in', request.url));
  }

  if (currentUser && isAuthenticationRoutes) {
    console.log("5")
    return Response.redirect(new URL('/not-found', request.url));
  }

  if (currentUser && currentUser.role != "OwnerCourt" && isOwnerRoute) {
    console.log("6")
    return Response.redirect(new URL('/not-found', request.url));
  }

  if (currentUser && currentUser.role != "Admin" && isAdminRoutes) {
    console.log("7")
    return Response.redirect(new URL('/not-found', request.url));
  }

  if (currentUser && currentUser.role != "Customer" && (isProtectedRoute || isPublicRoute)) {
    console.log("8")
    return Response.redirect(new URL('/not-found', request.url));
  }

  if (currentUser && !currentUser.isVerification && !path.startsWith('/verify')) {
    console.log("9")
    return Response.redirect(new URL('/verify', request.url));
  }

  if (currentUser && currentUser.isVerification && path.startsWith('/verify')) {
    console.log("10")
    return Response.redirect(new URL('/not-found', request.url));
  }

}

export const config = {
  matcher: [...protectedRoutes, ...publicRoutes, ...authenticationRoutes, ...adminRoutes, ...ownerRoutes],
};

