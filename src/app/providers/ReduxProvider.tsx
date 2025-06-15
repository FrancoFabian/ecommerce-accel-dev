// app/providers/ReduxProvider.tsx
'use client';
import { Provider } from 'react-redux';
import { ReactNode, useRef } from 'react';
import { makeStore, AppStore } from '@/store';

export default function ReduxProvider({ children }: { children: ReactNode }) {
const storeRef = useRef<AppStore | undefined>(undefined);

  if (!storeRef.current) storeRef.current = makeStore();

  return <Provider store={storeRef.current}>{children}</Provider>;
}
