import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get('token')
  if (request.nextUrl.pathname === '/Profile') {
    if (cookie) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/', request.url))
    }

  }
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};