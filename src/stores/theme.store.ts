import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { ThemeConfig } from '@/config';
import { Theme } from '@/interfaces';
import { ThemeManager } from '@compass-aiden/utils';

let ThemeInstance: ThemeManager;

export default defineStore('theme', () => {
  const $theme = ref<Theme | undefined>(Theme.DEFAULT);
  const $themeData = ref<Record<string, string | number> | null>(null);

  const currentTheme = computed(() => $theme.value || Theme.DEFAULT);

  const currentThemeData = computed(() => {
    return {
      ...$themeData.value,
    };
  });

  function initializeTheme() {
    if (ThemeInstance) {
      return;
    }
    ThemeInstance = new ThemeManager({
      baseVariables: ThemeConfig.common,
      hooks: {
        afterToggle: (themeName, themeData) => {
          $theme.value = themeName as Theme | undefined;
          $themeData.value = themeData;
        },
        // 使用hook动态设置主题
        afterSystemThemeChange: (systemTheme) => {
          const themeKey = ThemeInstance.getCurrentTheme();
          if (!themeKey || themeKey === 'default') {
            ThemeInstance.unregister('default');
            ThemeInstance.register('default', ThemeConfig[systemTheme]);
            ThemeInstance.toggle('default');
          }
        },
      }
    });
  }

  function getThemeInstance() {
    return ThemeInstance;
  }

  function register(theme: Theme, themeData: Record<string, string | number>) {
    ThemeInstance.register(theme, themeData);
  }

  function toggle(theme: Theme) {
    ThemeInstance.toggle(theme);
  }

  return {
    currentTheme,
    currentThemeData,
    initializeTheme,
    register,
    toggle,
    getThemeInstance,
  };
});
