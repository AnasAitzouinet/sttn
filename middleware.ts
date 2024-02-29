import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get('token')
  if (!cookie) {
    return
  }
  let token = jwt.decode(cookie?.value)
 
  if (request.url.startsWith('/Profile')) {
    if (cookie) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  if (request.url.startsWith('/Admin') ) {
    if (!token || typeof token !== 'object' || token.role !== 'admin') {
      console.log('redirecting')
      return Response.redirect(new URL('/', request.url));
    } else {
      return NextResponse.next();
    }
  }
  
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};