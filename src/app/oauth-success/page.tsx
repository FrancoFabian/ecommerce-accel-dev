// app/(public)/oauth-success/page.tsx  – sólo cliente
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OAuthSuccess() {
  const router = useRouter();

  useEffect(() => {
    /* Llama al route-handler para setear la cookie */
    router.replace('/api/auth/google-callback' + window.location.search);
  }, [router]);

  return (
    <main className="flex h-screen items-center justify-center">
      <p>Autenticación correcta. Redirigiendo…</p>
    </main>
  );
}
