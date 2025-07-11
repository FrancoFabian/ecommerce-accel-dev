import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface AuthToken {
  sub: string;
  exp: number;
  role: string[];
  email?: string;
  iat?: number;
}

export async function GET(request: NextRequest) {
  try {
    // Obtener el token de las cookies
    const accessToken = request.cookies.get('accessToken')?.value || 
                       request.cookies.get('token')?.value;

    if (!accessToken) {
      return NextResponse.json({ 
        isAuthenticated: false,
        user: null,
        expiresAt: null
      });
    }

    // Verificar si el token es válido y no ha expirado
    try {
      const decoded = jwtDecode<AuthToken>(accessToken);
      const now = Date.now();
      const expiresAt = decoded.exp * 1000;
      const isExpired = expiresAt <= now;
      
      if (isExpired) {
        return NextResponse.json({ 
          isAuthenticated: false,
          user: null,
          expiresAt: null
        });
      }
      
      return NextResponse.json({ 
        isAuthenticated: true,
        user: { 
          id: decoded.sub, 
          roles: decoded.role,
          email: decoded.email // si está disponible
        },
        expiresAt: expiresAt,
        tokenInfo: {
          issuedAt: decoded.iat ? decoded.iat * 1000 : null,
          timeToExpiry: expiresAt - now
        }
      });
    } catch (decodeError) {
      console.error('Error decoding token:', decodeError);
      return NextResponse.json({ 
        isAuthenticated: false,
        user: null,
        expiresAt: null
      });
    }
  } catch (error) {
    console.error('Error checking auth status:', error);
    return NextResponse.json({ 
      isAuthenticated: false,
      user: null,
      expiresAt: null
    }, { status: 500 });
  }
} 