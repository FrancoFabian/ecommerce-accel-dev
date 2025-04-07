import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

const createCookie = (name: string, value: string, maxAge: number): ResponseCookie => ({
  name,
  value,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge,
});

export async function POST(
  request: NextRequest,
  { params }: { params: { auth: string[] } }
) {
  const authType = params.auth[0]; // 'login' or 'logout'
  
  if (authType === 'login') {
    const body = await request.json();
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      
      // Create response with cookies
      const res = NextResponse.json({ success: true });
      
      // Set secure httpOnly cookie
      res.cookies.set(createCookie('token', data.token, 60 * 60)); // 1 hour

      // Optional: Set refresh token if implementing refresh flow
      if (data.refreshToken) {
        res.cookies.set(createCookie('refresh_token', data.refreshToken, 7 * 24 * 60 * 60)); // 7 days
      }

      return res;
      
    } catch (error) {
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      );
    }
  }
  
  if (authType === 'logout') {
    // Create response that clears cookies
    const res = NextResponse.json({ success: true });
    res.cookies.delete('auth_token');
    res.cookies.delete('refresh_token');
    return res;
  }

  return NextResponse.json(
    { error: 'Invalid auth type' },
    { status: 400 }
  );
}
