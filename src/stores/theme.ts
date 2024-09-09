import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import ThemeData from '../../theme.json';

export enum AvailableTheme {
  LIGHT = 'light',
  DARK = 'dark',
}

const useThemeStore = defineStore('theme', () => {
  const theme = ref<AvailableTheme>(AvailableTheme.LIGHT);

  const currentTheme = computed(() => theme.value);

  const currentThemeData = computed(() => {
    return Object.keys(ThemeData[currentTheme.value] as Record<string, string>)
      .filter((key) => key.startsWith('--'))
      .reduce(
        (obj, key) => {
          // eslint-disable-next-line no-param-reassign
          obj[key] = (ThemeData[currentTheme.value] as Record<string, string>)[key];
          return obj;
        },
        {} as Record<string, string>,
      );
  });

  function setTheme(newTheme: AvailableTheme) {
    theme.value = newTheme;
  }

  return {
    currentTheme,
    currentThemeData,
    setTheme,
  };
});

export default useThemeStore;
