import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key-that-is-long-enough');

interface UserJwtPayload {
  jti: string;
  iat: number;
  role?: string;
}

async function verifyJwt(token: string): Promise<UserJwtPayload | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as UserJwtPayload;
    } catch (error) {
        console.error("JWT Verification failed:", error);
        return null;
    }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  let payload: UserJwtPayload | null = null;
  if (token) {
    payload = await verifyJwt(token);
  }
  
  const isLoggedIn = !!payload;
  const isAdmin = payload?.role === 'admin';


  // If user is logged in and tries to access login, redirect to admin dashboard
  if (isLoggedIn && pathname.startsWith('/admin/login')) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // If user is not an admin and tries to access a protected admin route, redirect to login
  if (!isAdmin && pathname.startsWith('/admin') && pathname !== '/admin/login') {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin/login'],
};