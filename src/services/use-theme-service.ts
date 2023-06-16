import { ThemeManager } from '@compass-aiden/utils';
import { ThemeConfig } from '@/config';

let ThemeInstance: ThemeManager;

// function applyDefaultTheme(systemTheme: 'light' | 'dark') {
//   const currentTheme = ThemeInstance.getCurrentTheme();
//   if (systemTheme && (!currentTheme || currentTheme === 'default')) {
//     ThemeInstance.unregister('default');
//     ThemeInstance.register('default', ThemeConfig[systemTheme]);
//     ThemeInstance.toggle('default');
//   }
// }

function initTheme(
  afterChanged?: (themeName: string | undefined, themeData: Record<string, string | number> | null) => void,
) {
  ThemeInstance = new ThemeManager({
    baseVariables: ThemeConfig.common,
    hooks: {
      afterToggle: afterChanged,
      // afterSystemThemeChange: applyDefaultTheme,
    },
  });
  ThemeInstance.register('light', ThemeConfig.light);
  ThemeInstance.register('dark', ThemeConfig.dark);
  ThemeInstance.register('default', ThemeConfig.light);
  // applyDefaultTheme(ThemeInstance.systemTheme);
}

function getThemeInstance() {
  return ThemeInstance;
}

export default function useThemeService() {
  return {
    initTheme,
    getThemeInstance,
  };
}
