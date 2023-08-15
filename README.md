# {{name}}
> {{description}}

## Feature

### 支持React Hooks

除 Context API 外可用 Hooks 均可从`@saasquatch/stencil-hooks`导入

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

通过Props与Event使用即可

#### 祖先状态

参考[React Hooks](#支持react-hooks)Context API用法

#### 全局状态

用法如下:

```tsx
import { Component, h, Host } from '@stencil/core';
import { useEffect, useState, withHooks } from '@saasquatch/stencil-hooks';
import { Context } from '@/interfaces';
import { getContext, setupContext } from '@/utils';
import { CONTEXT_CHANGED_EVENT, globalEmitter } from '@/utils/emitter';

@Component({
  tag: 'cp-example',
  shadow: true,
})
export class CpExample {
  constructor() {
    withHooks(this);
  }
  render() {
    const [context, setContext] = useState<Context>(getContext());

    useEffect(() => {
      const listenCtxChanged = (ctx) => {
        // eslint-disable-next-line no-console
        console.log('Debug: ', '收到上下文变更事件');
        setContext(ctx);
      };
      /** 当上下文变更时同步上下文 */
      globalEmitter.on(CONTEXT_CHANGED_EVENT, listenCtxChanged);
      return () => globalEmitter.off(CONTEXT_CHANGED_EVENT, listenCtxChanged);
    }, []);
    
    return (
      <Host>
        <div>
          <h5>演示全局上下文使用</h5>
          当前上下文: {JSON.stringify(context)}
          <br />
          <button onClick={() => updateContext()} type="button">
            变更上下文
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

### 支持 Eslint 更健壮的代码检查

`pnpm lint` 进行检查

### 支持 Prettier 格式化

`pnpm format` 进行格式化
