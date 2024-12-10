import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === '/' || path === '/login' || path === '/register';

  const token = request.cookies.get('token')?.value || '';

  if (isPublicPath && token && path !== '/') {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  return NextResponse.next();
}

// Match paths for the middleware
export const config = {
  matcher: ['/', '/fruit', '/login', '/register'],
};
