import React, { useEffect } from 'react';
import { useThemeStore, ThemeContext } from './theme.store';

function AppProviders({ children }: { children: React.ReactNode }) {
  const { themeState, setThemeState, initTheme, getThemeInstance } = useThemeStore();

  useEffect(() => {
    initTheme((theme, themeData) => {
      setThemeState({
        theme,
        themeData,
      });
    });
    return () => {
      getThemeInstance().destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>;
}

export default AppProviders;
