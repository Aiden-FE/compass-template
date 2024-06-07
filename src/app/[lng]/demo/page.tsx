import Image from 'next/image';
import AppIcon from '@/components/app-icon/app-icon';
import SettingSvg from '@/assets/svgs/setting.svg';
import SettingSvgUrl from '@/assets/svgs/setting.svg?url';
import style from './index.module.scss';
import ThemeExample from './components/theme-example';
import ClientI18nExample from './components/client-i18n-example';
import ServerI18nExample from './components/server-i18n-example';
import { PageProps } from '@/interfaces';

export default function Demo({ params: { lng } }: PageProps) {
  return (
    <div className="w-full h-full dark:bg-slate-800 dark:text-white">
      <h2 className="text-xl font-semibold">BEM&ModuleCSS&Scss&Tailwindcss 展示</h2>
      <div className={style['cp-block']}>
        block
        <div className={style['cp-block__element']}>
        element
          <div className={style['cp-block__element_modifier']}>modifier</div>
        </div>
      </div>
      <h2 className="text-xl font-semibold mt-4">autoprefixer 展示</h2>
      <div className="origin-top-left rotate-12 w-[80px] h-[80px] bg-[yellow]"></div>
      <h2 className="text-xl font-semibold mt-4">Icon及Svg使用展示</h2>
      <div>
        <AppIcon className="text-4xl" icon="mdi-light:home" />
        <SettingSvg className="text-4xl" />
        <Image src={SettingSvgUrl} className="w-9 h-9" alt="This is the settings icon." />
      </div>
      <h2 className="text-xl font-semibold mt-4">主题相关</h2>
      <ThemeExample />
      <h2 className="text-xl font-semibold mt-4">客户端国际化演示</h2>
      <ClientI18nExample />
      <h2 className="text-xl font-semibold mt-4">服务端国际化演示</h2>
      <ServerI18nExample lng={lng} />
    </div>
  );
}
