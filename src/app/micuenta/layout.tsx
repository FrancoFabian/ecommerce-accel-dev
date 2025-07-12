"use client"

import { Sidebar } from '@/components/sidebar/SideBar';
import { MobileProfile } from '@/components/profile/MobileProfile';
import { usePathname } from 'next/navigation';
import { useOptimizedAuth } from '@/lib/hooks/useOptimizedAuth';
import { AccountPageSkeleton } from '@/components/skeletons/AccountPageSkeleton';
import { Suspense } from 'react';

interface MiCuentaLayoutProps {
  children: React.ReactNode;
}

export default function MiCuentaLayout({ children }: MiCuentaLayoutProps) {
  const pathname = usePathname();
  const isMainPage = pathname === '/micuenta';
  const { isLoading, isInitialized } = useOptimizedAuth();

  // Mostrar skeleton mientras se inicializa la autenticación
  if (!isInitialized || isLoading) {
    return <AccountPageSkeleton />;
  }

  return (
    <div className="flex bg-slate-800">
      {/* Desktop: Sidebar siempre visible */}
      <div className="hidden lg:block">
        <Suspense fallback={<div className="w-72 h-screen bg-gray-100 animate-pulse" />}>
          <Sidebar />
        </Suspense>
      </div>
      
      {/* Mobile: Mostrar MobileProfile solo en página principal */}
      {isMainPage && (
        <div className="lg:hidden w-full">
          <Suspense fallback={<AccountPageSkeleton />}>
            <MobileProfile />
          </Suspense>
        </div>
      )}
      
      {/* Desktop: Contenido principal */}
      <main className={`flex-1 ${isMainPage ? 'hidden lg:block' : ''}`}>
        <Suspense fallback={<AccountPageSkeleton />}>
          {children}
        </Suspense>
      </main>
    </div>
  );
}
