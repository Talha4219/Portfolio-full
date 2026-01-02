import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-key-that-is-long-enough');

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Please provide email and password' }, { status: 400 });
    }

    // Find user by email
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      console.log('Login failed: Password mismatch for email:', email);
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Check if user is an admin
    if (user.role !== 'admin') {
      console.log('Login failed: User is not admin:', email);
      return NextResponse.json({ message: 'Not authorized to access this route' }, { status: 403 });
    }

    console.log('Login successful for:', email);

    // Create and sign the token
    const token = await new SignJWT({ userId: user._id, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h') // Token expires in 1 hour
      .sign(JWT_SECRET);
    
    // Set cookie
    cookies().set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 60, // 1 hour
        path: '/',
    });

    return NextResponse.json({ message: 'Logged in successfully' });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
