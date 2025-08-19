import { NextResponse } from "next/server";

const privatePaths = ['/manage']
const unAuthPaths = ['/login', '/register']
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isAuth = request.cookies.get('accessToken')?.value
  const isPrivate = privatePaths.some(path => pathname.startsWith(path))
  const isUnAuth = unAuthPaths.some(path => pathname.startsWith(path))

  if (isPrivate && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isUnAuth && isAuth) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  return NextResponse.next()
}
 
export const config = {
  matcher: ['/manage/:path*', '/login', '/register'],
}