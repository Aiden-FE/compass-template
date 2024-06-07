import { createStore } from 'zustand/vanilla'

export type ThemeState = {
  /**
   * - light 亮色主题
   * - dark 暗色主题
   * - system 系统主题
   */
  currentTheme: 'light' | 'dark' | 'system';
  currentSystemTheme: 'light' | 'dark';
}

export type ThemeActions = {
  /** 设置应用主题 */
  setTheme: (targetTheme: ThemeState['currentTheme']) => void;
  /** 设置当前系统主题,仅做记录,当主题为system时,才会读取系统主题值 */
  setCurrentSystemTheme: (targetTheme: ThemeState['currentSystemTheme']) => void;
  /** 根据Key获取当前主题对应的变量值 */
  getCurrentThemeValueByKey: (key: string) => string;
  /**
   * 获取当前主题所有的变量值
   * @param {RegExp} matchRegex 匹配规则默认匹配 '--' 开头的属性
   */
  getCurrentThemeValues: (matchRegex?: RegExp) => Record<string, string>;
}

export type ThemeStore = ThemeState & ThemeActions

export const createDefaultThemeState = () => ({
  currentTheme: 'system',
  currentSystemTheme: 'light',
} as ThemeState);

export const createThemeStore = (
  initState: ThemeState = createDefaultThemeState(),
) => {
  return createStore<ThemeStore>()((set) => ({
    ...initState,
    setTheme: (targetTheme) => set((state) => {
      if (targetTheme === 'system') {
        document.documentElement.setAttribute('data-theme', state.currentSystemTheme);
      } else {
        document.documentElement.setAttribute('data-theme', targetTheme);
      }
      return {
        currentTheme: targetTheme,
      };
    }),
    setCurrentSystemTheme: (targetTheme) => set((state) => {
      if (state.currentTheme === 'system') {
        document.documentElement.setAttribute('data-theme', targetTheme);
      }
      return {
        currentSystemTheme: targetTheme,
      };
    }),
    getCurrentThemeValueByKey: (key) => {
      return getComputedStyle(document.documentElement).getPropertyValue(key);
    },
    getCurrentThemeValues: (matchRegex = /^--.*$/) => {
      const themeVariables = {} as Record<string, string>;
      const computedStyle = getComputedStyle(document.documentElement)
      document.documentElement.computedStyleMap().forEach((_, key) => {
        if (matchRegex.test(key)) {
          themeVariables[key] = computedStyle.getPropertyValue(key);
        }
      })
      return themeVariables;
    },
  }));
}
