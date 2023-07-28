# {{name}}

> {{description}}

## Features

### 支持 sass,Postcss,tailwind

示例如下:

```tsx
import styles from './example.module.scss';

function ExamplePage() {
  return (
    <div className={`${styles.container} flex min-h-full flex-col justify-center px-6 py-12 lg:px-8`}>
      This is example.
    </div>
  );
}

export default ExamplePage;
```

### 支持BEM

示例如下:

*index.module.scss*文件内容:

```scss
@include b(example) {
  @apply text-base; // apply是在使用tailwind的css
  @include e(element) {
    @apply font-bold;
    @include m(modifier) {
      @apply text-blue-400;
    }
  }
}
```

组件用法:

```tsx
import styles from './index.module.scss';

function ExamplePage() {
  return (
    <div className={styles['cp-example']}>
      Block 块级选择示例
      <div className={styles['cp-example__element']}>
        Element 元素选择示例
        <div className={styles['cp-example__element_modifier']}>Modifier 状态选择示例</div>
      </div>
    </div>
  );
}

export default ExamplePage;
```

> 如果需要更换 `cp` 作用域前缀请修改 `src/assets/styles/variables.scss` 文件内容的$domain值

### 支持 Icon及 Svg 使用

基于 [Iconify](https://iconify.design/docs/) 实现,所有[IconSets](https://icon-sets.iconify.design/)图标均可直接使用,内部按需加载,并且支持直接使用项目内部的svg文件

示例如下:

```tsx
import AppIcon from '@/components/app-icon/app-icon';
import SvgIcon from '@/components/app-icon/svg-icon';

function ExamplePage() {
  return (
    <>
      {/* 使用 IconSets所有图标 */}
      <AppIcon icon="mdi-light:home" />
      {/* 使用业务特有的svg图标文件 */}
      <SvgIcon />
    </>
  );
}

export default ExamplePage;
```

如果希望直接使用Svg文件而不是通过SvgIcon组件中转,请确保是在 use client 客户端渲染模式下导入,例如:

```tsx
'use client';

import SvgSetting from '@/assets/svgs/setting.svg';

function ExamplePage() {
  return (
    <>
      {/* 使用业务特有的svg图标文件 */}
      <SvgSetting />
    </>
  );
}

export default ExamplePage;
```

### 支持 Stores 状态管理

新建Store时,请参考`templates/example.store.ts`文件内的使用引导即可

使用Store示例如下:

```tsx
import { useAppSelector, useAppDispatch, exampleActions } from '@/stores';

function ExamplePage() {
  const example = useAppSelector((state) => state.example);
  const dispatch = useAppDispatch();

  function updateStore() {
    // 更新store
    dispatch(exampleActions.update({}));
  }

  return <>{example.test}</>;
}

export default ExamplePage;
```

### 主题使用

主题变量表存在于 `src/config/theme.json`,

当需要新增一个主题时,在主题变量表新增一个 `{ [key: string]: Record<string, string | number> }` 数据即可,common为保留字段,其下的所有值在任何主题内生效

当需要读取或变更主题时,参考如下:

```tsx
import { useAppSelector } from '@/stores';
import { AvailableTheme } from '@/config';

function ExamplePage() {
  const theme = useAppSelector((state) => state.theme);

  function toggleTheme(themeName: AvailableTheme) {
    theme.themeInstance.toggle(themeName);
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

export default ExamplePage;
```

### 国际化

国际化文件均位于 `src/i18n/locales/[language]/[namespace].json`

扩展国际化文件:
- 在`src/i18n/locales/`目录下新建对应命名空间的翻译文件
- 更新`src/config/index.ts`文件内的 AvailableLanguages,AvailableLanguagesNS,Languages等变量

#### 服务端渲染国际化

```tsx
import { useTranslation } from '@/i18n';
import { ComponentProps } from '@/interfaces';
import { AvailableLanguages } from '@/config';
import Link from 'next/link';

async function I18nExample({ lang }: ComponentProps) {
  const { t, i18n } = await useTranslation(lang);

  return (
    <div>
      {t('currentLanguage', { lang: i18n.resolvedLanguage })}
      <br />
      <div>
        <Link href={`/${AvailableLanguages.ZH_CN}/example`}>使用中文</Link>
        <br />
        <Link href={`/${AvailableLanguages.EN}/example`}>Use English</Link>
      </div>
    </div>
  );
}

export default I18nExample;
```

#### 客户端渲染国际化

```tsx
'use client';

import { useClientTranslation } from '@/i18n/client';
import { AvailableLanguages } from '@/config';

function ClientI18nExample() {
  const { t, i18n } = useClientTranslation();

  function toggleLang(lng: AvailableLanguages) {
    i18n.changeLanguage(lng);
  }

  return (
    <div>
      {t('currentLanguage', { lang: i18n.resolvedLanguage })}
      <br />
      <div>
        <button onClick={() => toggleLang(AvailableLanguages.ZH_CN)} type="button">
          使用中文
        </button>
        <button onClick={() => toggleLang(AvailableLanguages.EN)} type="button">
          Use English
        </button>
      </div>
    </div>
  );
}

export default ClientI18nExample;
```

### 支持 Eslint 更健壮的代码检查

`pnpm lint` 进行检查

### 支持 Prettier 格式化

`pnpm format` 进行格式化
