'use client';

import { Provider } from 'react-redux';
import React from 'react';
import { store } from '@/stores/store';

export default function StoresProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
