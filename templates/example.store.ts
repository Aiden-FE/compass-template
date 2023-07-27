import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * @description store使用引导
 * 1. 复制文件至 `src/stores/` 文件夹下,并修改文件名,后续假设文件名为 `example.store.ts`
 * 2. 在 `src/stores/index.ts` 添加 `export * from './example.store';` 进行导出
 * 3. 在 `src/stores/store.ts` 文件顶部添加 `import exampleStore from './example.store';`
 * 4. 在 `src/stores/store.ts` 文件内的 `store.reducer`内添加 { example: exampleStore }
 * 5. 修改本文件所有 FIXME 相关内容,并移除本引导注释
 */

// 定义state类型 // FIXME: 请根据实际业务修改state名称
export interface ExampleState {}

// FIXME: 请根据实际业务修改slice名称
const exampleSlice = createSlice({
  name: 'example', // FIXME: 请根据实际业务修改名称
  initialState: {} as ExampleState,
  reducers: {
    update(state, action: PayloadAction<ExampleState>) {
      // eslint-disable-next-line no-console
      console.log(state, action);
    },
  },
});

// FIXME: 请根据实际业务修改actions名称
export const exampleActions = exampleSlice.actions;

export default exampleSlice.reducer;
