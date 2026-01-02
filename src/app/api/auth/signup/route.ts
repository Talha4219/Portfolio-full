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

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        // Create new user (role defaults to 'admin' for first users or as per project requirements)
        // In a real-world scenario, you might want a more restrictive signup process.
        const userCount = await User.countDocuments();
        const role = userCount === 0 ? 'admin' : 'admin'; // For this portfolio, we assume anyone signing up is an admin for now, or you could restrict this.

        const user = new User({
            email,
            password,
            role: 'admin', // Force admin role for this specific portfolio use case
        });

        await user.save();

        // Create and sign the token
        const token = await new SignJWT({ userId: user._id, role: user.role })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(JWT_SECRET);

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 60 * 60, // 1 hour
            path: '/',
        });

        return NextResponse.json({ message: 'User created and logged in successfully' }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Server Error' }, { status: 500 });
    }
}
