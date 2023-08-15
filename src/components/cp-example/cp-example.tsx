import { Component, h } from '@stencil/core';
import { useEffect, useState, withHooks } from '@saasquatch/stencil-hooks';
import { Context } from '@/interfaces';
import { CONTEXT_CHANGED_EVENT, getContext, globalEmitter, setupContext } from '@/utils';
import IconArrow from '../../assets/svg/arrow.svg';
import zhCN from '../../static/locales/zh-CN.json';
import EN from '../../static/locales/en.json';

@Component({
  tag: 'cp-example',
  shadow: true,
  styleUrls: ['./index.scss'],
})
export class CpExample {
  constructor() {
    withHooks(this);
  }

  render() {
    const [context, setContext] = useState<Context>(getContext());
    // const i18n = useTranslation();
    useEffect(() => {
      const listenCtxChanged = (ctx) => {
        // eslint-disable-next-line no-console
        console.log('Debug: ', '收到上下文变更事件', ctx);
        setContext(ctx);
        setTimeout(() => {
          console.log('context: ', context);
        }, 500);
      };
      /** 当上下文变更时同步上下文 */
      globalEmitter.on(CONTEXT_CHANGED_EVENT, listenCtxChanged);
      return () => globalEmitter.off(CONTEXT_CHANGED_EVENT, listenCtxChanged);
    }, [context]);

    function updateContext() {
      setupContext({
        componentSize: 'small',
      });
    }

    return (
      <div class="cp-example">
        <div>
          <h5>BEM演示</h5>
          <div class="cp-example-b">
            block
            <div class="cp-example-b__e">
              element
              <div class="cp-example-b__e_m">modifier</div>
            </div>
          </div>
        </div>
        <div>
          <h5>演示Icon使用</h5>
          使用Svg icon: <span class="cp-example__arrow w-[24px] h-[24px] inline-block" innerHTML={IconArrow} />
        </div>
        <div>
          <h5>演示全局上下文使用</h5>
          当前上下文: {JSON.stringify(context)}
          <br />
          <button onClick={() => updateContext()} type="button">
            变更上下文
          </button>
        </div>
        <div>
          <h5 class="text-[--cp-wc-primary-color]">主题颜色</h5>
          <button class="hover:text-[--cp-wc-primary-color]" type="button">
            Hover display primary color
          </button>
        </div>
        <div>
          <h5>国际化演示</h5>
          {/* <p>{i18n.t('The current language is')}</p> */}
          <button onClick={() => setupContext({ language: zhCN })} type="button">
            使用中文
          </button>
          <br />
          <button onClick={() => setupContext({ language: EN })} type="button">
            使用英文
          </button>
        </div>
      </div>
    );
  }

  disconnectedCallback() {}
}
