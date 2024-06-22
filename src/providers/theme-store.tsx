'use client';

import { type ReactNode, createContext, useRef, useContext, useEffect } from 'react';
import { type StoreApi, useStore } from 'zustand';
import { type ThemeStore, createThemeStore, createDefaultThemeState } from '@/stores/theme';
import { AvailableTheme } from '@/config';

export const ThemeStoreContext = createContext<StoreApi<ThemeStore> | null>(null);

export interface ThemeStoreProviderProps {
  children: ReactNode;
}

export const ThemeStoreProvider = ({ children }: ThemeStoreProviderProps) => {
  const storeRef = useRef<StoreApi<ThemeStore>>();
  if (!storeRef.current) {
    storeRef.current = createThemeStore(createDefaultThemeState());
  }

  useEffect(() => {
    if (!storeRef.current) {
      return;
    }
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    // 设置当前系统主题
    storeRef.current.getState().setCurrentSystemTheme(prefersDarkMode.matches ? 'dark' : 'light');
    // 系统主题变更时更新主题
    prefersDarkMode.addEventListener('change', (event) => {
      storeRef.current?.getState().setCurrentSystemTheme(event.matches ? 'dark' : 'light');
    });
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      storeRef.current.getState().setTheme(localTheme as AvailableTheme);
    }
  }, []);

  return <ThemeStoreContext.Provider value={storeRef.current}>{children}</ThemeStoreContext.Provider>;
};

export const useThemeStore = <T = ThemeStore,>(selector: (store: ThemeStore) => T): T => {
  const themeStoreContext = useContext(ThemeStoreContext);

  if (!themeStoreContext) {
    throw new Error('useThemeStore must be use within ThemeStoreProvider');
  }

  return useStore(themeStoreContext, selector);
};
