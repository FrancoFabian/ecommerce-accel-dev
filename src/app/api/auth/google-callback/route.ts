// app/api/auth/google-callback/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    // token ausente → vuelve al login
    return NextResponse.redirect(new URL('/login', req.url));
  }

  /* 1) Guardar token en cookie http-only/secure */
  (await cookies()).set({
    name: 'accessToken',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 // 24 h
  });                               // :contentReference[oaicite:2]{index=2}

  /* 2) Redirigir a la zona privada */
  return NextResponse.redirect(new URL('/micuenta', req.url));
}
