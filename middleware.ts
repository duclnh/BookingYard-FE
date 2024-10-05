import { decode } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/profile', '/verify']
const publicRoutes = ['/', '/partner', '/contact', '/booking']
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
const authenticationRoutes = [
  '/sign-up',
  '/forget-password',
  '/admin/forget-password',]


export async function middleware(request: NextRequest) {
  let sessionToken = request.cookies.get("next-auth.session-token")?.value;
  if (process.env.NODE_ENV === 'production') {
    sessionToken = request.cookies.get("__Secure-next-auth.session-token")?.value;
  }
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


  if ((currentUser == null || currentUser.role === 'Customer') && path.startsWith('/admin/authorization')) {
    console.log("Error Here: 3")
    return Response.redirect(new URL('/not-found', request.url));
  }

  if ((isAdminRoutes || isOwnerRoute) && currentUser == null && !isAuthenticationRoutes) {
    console.log("Error Here: 4")
    return Response.redirect(new URL('/admin/sign-in', request.url));
  }

  if (isProtectedRoute && currentUser == null && !isAuthenticationRoutes) {
    console.log("Error Here: 5")
    return Response.redirect(new URL('/sign-in', request.url));
  }

  if (currentUser) {
    if (currentUser.role != "CourtOwner" && isOwnerRoute) {
      console.log("Error Here: 6")
      return Response.redirect(new URL('/not-found', request.url));
    }

    if (currentUser.role != "Admin" && isAdminRoutes) {
      console.log("Error Here: 7")
      return Response.redirect(new URL('/not-found', request.url));
    }

    if (currentUser.role != "Customer" && (isProtectedRoute || isPublicRoute)) {
      console.log("Error Here: 8")
      return Response.redirect(new URL('/admin/authorization', request.url));
    }

    if (currentUser.isVerification && path.startsWith('/verify')) {
      console.log("Error Here: 10")
      return Response.redirect(new URL('/not-found', request.url));
    }
    if (currentUser && isAuthenticationRoutes) {
      return Response.redirect(new URL('/not-found', request.url));
    }
  }

}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',],
};

