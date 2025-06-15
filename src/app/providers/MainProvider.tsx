// app/providers/MainProvider.tsx
'use client';
import React from 'react';
import ReduxProvider from '@/app/providers/ReduxProvider';

export function MainProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  );
}
