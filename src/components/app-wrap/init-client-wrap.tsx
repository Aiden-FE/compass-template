'use client';

import React, { useEffect } from 'react';
import { initializeThemeAsync, useAppDispatch } from '@/stores';
import providePlugins from '@/plugins';

providePlugins();

function InitClientWrap({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(initializeThemeAsync());
  });

  return children;
}

export default InitClientWrap;