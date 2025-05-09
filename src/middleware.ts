import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { protectedRoutes } from './constants/routes'

export function middleware(
  request: NextRequest
): Promise<unknown> | NextResponse {
  const pathname = request.nextUrl.pathname

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  const hasSidCookie = request.cookies.has('sid')

  if (isProtectedRoute && !hasSidCookie) {
    const redirectUrl = new URL('/login', request.url)

    redirectUrl.searchParams.set('redirectUrl', pathname)

    return NextResponse.redirect(redirectUrl)
  }

  const next = NextResponse.next({
    request: {
      ...request,
      headers: requestHeaders,
    },
  })

  // TICKET_HERE
  next.cookies.set('aungpao', 'DEV_FBHY5NKMML')

  return next
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login page
     */
    '/((?!_next/static|_next/image|favicon.ico|login).*)',
  ],
}
