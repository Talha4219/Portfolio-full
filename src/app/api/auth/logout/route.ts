import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  // Clear the token cookie
  cookies().set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    expires: new Date(0), // Set to a past date to expire immediately
    path: '/',
  });

  return NextResponse.json({ message: 'Logged out successfully' });
}