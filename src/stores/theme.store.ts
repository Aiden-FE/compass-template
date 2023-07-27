import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ThemeManager } from '@compass-aiden/utils';
import { AvailableTheme, ThemeConfig } from '@/config';
import debounce from 'lodash-es/debounce';
import type { RootState } from '@/stores/store';

interface ThemeState {
  themeInstance?: InstanceType<typeof ThemeManager>;
  theme?: string;
  themeData?: Record<string, string | number> | null | undefined;
}

export const initializeThemeAsync = createAsyncThunk(
  'theme/initializeThemeAsync',
  async (_, { dispatch, getState }) => {
    const state: ThemeState = (getState() as RootState).theme;
    if (state.themeInstance) {
      return;
    }
    const themeInstance = new ThemeManager({
      baseVariables: ThemeConfig.common,
      hooks: {
        afterToggle: debounce((theme, themeData) => {
          dispatch(
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            themeActions.update({
              theme: theme || AvailableTheme.AUTO,
              themeData,
            }),
          );
        }, 200),
      },
    });
    dispatch(
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      themeActions.update({
        themeInstance,
      }),
    );
    Object.keys(ThemeConfig)
      .filter((key) => key !== 'common')
      .forEach((key) => {
        themeInstance.register(key, (ThemeConfig as { [key: string]: Record<string, string | number> })[key]);
      });
    themeInstance.register(AvailableTheme.AUTO, ThemeConfig.light);
  },
);

const themeSlice = createSlice({
  name: 'theme',
  initialState: {} as ThemeState,
  reducers: {
    toggle(state, action: PayloadAction<AvailableTheme>) {
      if (!state.themeInstance) {
        return;
      }
      state.themeInstance.toggle(action.payload);
    },
    update(state, action: PayloadAction<ThemeState>) {
      // eslint-disable-next-line no-param-reassign
      state.theme = action.payload?.theme || AvailableTheme.AUTO;
      // eslint-disable-next-line no-param-reassign
      state.themeData = action.payload?.themeData;
      if (action.payload.themeInstance) {
        // eslint-disable-next-line no-param-reassign
        state.themeInstance = action.payload.themeInstance;
      }
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
