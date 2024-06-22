'use client';

import { AvailableTheme } from '@/config';
import { useThemeStore } from '@/providers/theme-store';

export default function ThemeExample() {
  const { currentTheme, setTheme, getCurrentThemeValueByKey, getCurrentThemeValues } = useThemeStore((state) => state);

  function toggleTheme() {
    setTheme(currentTheme === AvailableTheme.LIGHT ? AvailableTheme.DARK : AvailableTheme.LIGHT);
  }

  function setSystemTheme() {
    setTheme(AvailableTheme.SYSTEM);
  }

  function consoleThemeValue() {
    console.log('获取特定key值', getCurrentThemeValueByKey('--foreground-rgb'));
    console.log('获取所有CSS变量', getCurrentThemeValues());
    console.log('获取所有"--background"前缀的CSS变量', getCurrentThemeValues(/^--background.*$/));
  }

  return (
    <div>
      {currentTheme}
      <br />
      <button
        type="button"
        onClick={toggleTheme}
        className="px-4 py-2 mr-2 font-semibold text-sm text-white rounded-md shadow-sm bg-sky-500 hover:bg-sky-600"
      >
        切换主题
      </button>
      <button
        type="button"
        onClick={setSystemTheme}
        className="px-4 py-2 mr-2 font-semibold text-sm text-white rounded-md shadow-sm bg-sky-500 hover:bg-sky-600"
      >
        使用系统主题
      </button>
      <button
        type="button"
        onClick={consoleThemeValue}
        className="px-4 py-2 font-semibold text-sm text-white rounded-md shadow-sm bg-sky-500 hover:bg-sky-600"
      >
        控制台打印主题变量
      </button>
    </div>
  );
}
