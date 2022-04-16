import { App } from 'vue';
import { Theme } from '@compass-aiden/utils';
import { DARK_THEME, LIGHT_THEME } from '~/config';

export const THEME_PROVIDE_KEY = 'Theme';

export default function injectTheme(app: App) {
  const theme = new Theme({ selector: 'body' })
    .registerTheme('light', LIGHT_THEME)
    .registerTheme('dark', DARK_THEME);

  theme.toggleTheme('light');

  app.provide(THEME_PROVIDE_KEY, theme);
}
