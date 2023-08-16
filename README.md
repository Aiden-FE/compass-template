# {{name}}
> {{description}}

## Feature

### 支持React Hooks

除 Context API 外的 Hooks 均可从`@saasquatch/stencil-hooks`导入

示例:

```tsx
import { useEffect, useMemo, useState, withHooks } from '@saasquatch/stencil-hooks';

@Component({
  tag: 'tree-node',
  styleUrl: 'tree-node.scss',
  shadow: true,
})
export class TreeNode {
  @Prop() nodeData: NodeData;

  @Prop() indentLevel = 0;

  constructor() {
    withHooks(this); // 必须提供
  }

  render() {
    const [treeStore, setTreeStore] = useState<TreeStore>(null);
    const [isExpand, setExpand] = useState(false);
    const indent = useMemo(() => {
      return new Array(this.indentLevel).fill(1);
    }, [this.indentLevel]);
    const currentId = useMemo(() => {
      return this.nodeData[treeStore?.fieldNames?.id];
    }, [this.nodeData, treeStore]);

    useEffect(() => {
      // ...
    }, [treeStore, currentId]);

    return (
      <Host>
        <div>......</div>
      </Host>
    );
  }

  disconnectedCallback() {} // 必须提供
}
```

使用 Context API:

在`src/stores`内新建`tree-context.tsx`文件,示例如下

```tsx
import { createContext, html } from 'haunted';
import { FunctionalComponent, h } from '@stencil/core';
import { TreeStore } from '@/interfaces';

// 创建上下文
const CDXPTreeContext = createContext<TreeStore>(null);

// 声明可用的provider与consumer
customElements.define('tree-provider', CDXPTreeContext.Provider);
customElements.define('tree-consumer', CDXPTreeContext.Consumer);

// 导出Provider
export const TreeProvider: FunctionalComponent<{ store: TreeStore; style?: Partial<CSSStyleDeclaration> }> = (
  { store, style },
  children,
) => {
  return (
    <tree-provider value={store} style={style}>
      {children}
    </tree-provider>
  );
};

// 导出Consumer
export const TreeConsumer: FunctionalComponent<{ store: (state: TreeStore) => unknown }> = ({ store }) => {
  return (
    <tree-consumer
      render={(state) => {
        store(state);
        return html``;
      }}
    ></tree-consumer>
  );
};
```

在`src/stores/index.ts`内导出`export * from './tree-context';`

在父组件使用 Provider:

```tsx
import { TreeProvider } from '@/stores';

@Component({
  tag: 'tree',
  styleUrl: 'tree.scss',
  shadow: true,
})
export class Tree {
  render() {
    return (
      <TreeProvider
        store={
          {
            // 传入tree store
          }
        }
      >
        <div>Dom elements</div>
      </TreeProvider>
    );
  }
}
```

在子组件消费 store:

```tsx
import { TreeConsumer } from '@/stores';

@Component({
  tag: 'tree-node',
  styleUrl: 'tree-node.scss',
  shadow: true,
})
export class TreeNode {
  constructor() {
    withHooks(this);
  }

  render() {
    // 用来接收上下文
    const [treeStore, setTreeStore] = useState<TreeStore>(null);

    return (
      <Host>
        <TreeConsumer store={setTreeStore}></TreeConsumer>
        <div>Use treeStore {treeStore ? Object.keys(treeStore) : null}</div>
      </Host>
    );
  }

  disconnectedCallback() {}
}
```

- Stencil store

[使用示例](https://github.com/ionic-team/stencil-store#example)

### 支持 sass,Postcss,autoprefixer,tailwind

```tsx
@Component({
  tag: 'cp-example',
  styleUrl: './cp-example.scss', // Use scss file
  shadow: true,
})
export class CPExample {
  render() {
    return (
      <Host>
        {/* tailwind class */}
        <div class={'select-none flex-1 truncate'}>Hello world</div>
      </Host>
    );
  }
}
```

### 支持BEM

```scss
@import 'src/assets/styles/bem.scss';

@include b(tree) {
  // .cp-tree
  display: flex;
  @include e(node) {
    // .cp-tree__node
    display: flex;
    @include m(selected) {
      // .cp-tree__node_selected
      background-color: aqua;
    }
  }
}
```

前缀默认 cp,如需更换请修改 `src/assets/styles/vars.scss` 文件内的 $domain 值

### Icon使用

使用Svg图标:

```tsx
import { Component, Host, h } from '@stencil/core';
import IconArrow from '../../assets/svg/arrow.svg';

@Component({
  tag: 'cp-example',
  shadow: true,
})
export class CpExample {
  render() {
    return (
      <Host>
        <div>
          <h5>演示Icon使用</h5>
          使用Svg icon: <span class="w-[24px] h-[24px] inline-block" innerHTML={IconArrow} />
        </div>
      </Host>
    );
  }
}
```

### 状态管理

#### 父子状态

通过Stencil的Props与Event使用即可

#### 祖先状态

参考[Context API](#支持react-hooks)用法

#### 全局状态

用法如下:

```tsx
import { Component, h, Host } from '@stencil/core';
import { withHooks } from '@saasquatch/stencil-hooks';
import { useAppContext } from '@/utils';

@Component({
  tag: 'cp-example',
  shadow: true,
})
export class CpExample {
  constructor() {
    withHooks(this);
  }
  render() {
    const { context, setContext } = useAppContext();
    
    return (
      <Host>
        <div>
          <h5>演示全局上下文使用</h5>
          组件大小: {context.componentSize}
          <br />
          <button
            onClick={() => setContext({ componentSize: context.componentSize === 'middle' ? 'small' : 'middle' })}
            type="button"
          >
            变更组件大小
          </button>
        </div>
      </Host>
    )
  }
  disconnectedCallback() {}
}
```

### 主题使用

通过CSS Variables应用主题, 主题变量定义在`src/assets/styles/theme.scss`

```tsx
@Component({
  tag: 'cp-example',
  shadow: true,
})
export class CpExample {
  render() {
    return (
      <div>
        <h5 class="text-[--cp-wc-primary-color]">主题颜色</h5>
        <button class="hover:text-[--cp-wc-primary-color]" type="button">
          Hover display primary color
        </button>
      </div>
    );
  }
}
```

### 国际化

使用默认 COMMON 命名空间与语言切换示例:

```tsx
import { useAppContext, useI18n } from '@/utils';
import zhCN from '../../static/locales/zh-CN.json';
import EN from '../../static/locales/en.json';

@Component({
  tag: 'cp-example',
  shadow: true,
})
export class CpExample {
  constructor() {
    withHooks(this);
  }
  render() {
    const { t } = useI18n();
    const { setContext } = useAppContext();

    return (
      <div>
        <h5>国际化演示</h5>
        <p>{t('The current language is')}</p>
        <button onClick={() => setContext({ language: zhCN })} type="button">
          使用中文
        </button>
        <br />
        <button onClick={() => setContext({ language: EN })} type="button">
          使用英文
        </button>
      </div>
    );
  }
  disconnectedCallback() {}
}
```

使用指定命名空间示例:

```tsx
import { AvailableLanguagesNS, useI18n } from '@/utils';

@Component({
  tag: 'cp-example',
  shadow: true,
})
export class CpExample {
  constructor() {
    withHooks(this);
  }
  render() {
    // useI18n(AvailableLanguagesNS.LOGIN)
    // useI18n([AvailableLanguagesNS.LOGIN])
    const { t } = useI18n(AvailableLanguagesNS.LOGIN);

    return (
      <div>
        <h5>国际化演示</h5>
        <p>common命名空间始终可用: {t('The current language is')}</p>
        <p>使用指定的Login命名空间: {t('Sign in')}</p>
        <p>临时使用未指定的prompts命名空间: {t('Unknown error', { ns: AvailableLanguagesNS.PROMPTS })}</p>
      </div>
    );
  }
  disconnectedCallback() {}
}
```

### 支持 Eslint 更健壮的代码检查

`pnpm lint` 进行检查

### 支持 Prettier 格式化

`pnpm format` 进行格式化
