'use client';
import { useThemeStore } from '@/providers/theme-store';

export default function ThemeExample() {
  const { currentTheme, setTheme, getCurrentThemeValueByKey, getCurrentThemeValues } = useThemeStore((state) => state);

  function toggleTheme() {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  function setSystemTheme() {
    setTheme('system');
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
      <button onClick={toggleTheme} className="px-4 py-2 mr-2 font-semibold text-sm text-white rounded-md shadow-sm bg-sky-500 hover:bg-sky-600">切换主题</button>
      <button onClick={setSystemTheme} className="px-4 py-2 mr-2 font-semibold text-sm text-white rounded-md shadow-sm bg-sky-500 hover:bg-sky-600">使用系统主题</button>
      <button onClick={consoleThemeValue} className="px-4 py-2 font-semibold text-sm text-white rounded-md shadow-sm bg-sky-500 hover:bg-sky-600">控制台打印主题变量</button>
    </div>
  );
}
