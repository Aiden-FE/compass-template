import { Component, h } from '@stencil/core';
import { withHooks } from '@saasquatch/stencil-hooks';
import { AvailableLanguagesNS, setupContext, useAppContext, useI18n } from '@/utils';
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
    const { t } = useI18n(AvailableLanguagesNS.LOGIN);
    const { context, setContext } = useAppContext();

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
          组件大小: {context.componentSize}
          <br />
          <button
            onClick={() => setContext({ componentSize: context.componentSize === 'middle' ? 'small' : 'middle' })}
            type="button"
          >
            变更组件大小
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
          <p>common命名空间始终可用: {t('The current language is')}</p>
          <p>使用useI18n参数指定的Login命名空间: {t('Sign in')}</p>
          <p>临时使用未指定的prompts命名空间: {t('Unknown error', { ns: AvailableLanguagesNS.PROMPTS })}</p>
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
