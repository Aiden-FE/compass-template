import { createContext, useState } from 'react';
import { useThemeService } from '@/services';

export interface ThemeState {
  theme?: 'light' | 'dark' | 'default' | string;
  themeData?: Record<string, string | number> | null;
}

export const ThemeContext = createContext<ThemeState>({});

export function useThemeStore() {
  const { initTheme, getThemeInstance } = useThemeService();

  const [themeState, setThemeState] = useState<ThemeState>({
    theme: 'default',
    themeData: null,
  });

  return {
    themeState,
    setThemeState,
    initTheme,
    getThemeInstance,
  };
}
