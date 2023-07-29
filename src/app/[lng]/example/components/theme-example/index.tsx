'use client';

import { AvailableTheme } from '@/config';
import { useAppSelector } from '@/stores';

function ThemeExample() {
  const theme = useAppSelector((state) => state.theme);

  function toggleTheme(themeName: AvailableTheme) {
    theme.themeInstance?.toggle(themeName);
  }

  return (
    <>
      <div>当前主题: {theme?.theme}</div>
      <div>当前主题数据: {JSON.stringify(theme?.themeData)}</div>
      <div>
        <button onClick={() => toggleTheme(AvailableTheme.AUTO)} type="button">
          使用默认系统主题
        </button>
        <button onClick={() => toggleTheme(AvailableTheme.LIGHT)} type="button">
          使用亮色主题
        </button>
        <button onClick={() => toggleTheme(AvailableTheme.DARK)} type="button">
          使用暗色主题
        </button>
      </div>
    </>
  );
}

export default ThemeExample;
