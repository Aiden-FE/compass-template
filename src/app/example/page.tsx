import styles from './index.module.scss';
import AppIcon from "@/components/app-icon/app-icon";
import IconSettingUrl from '@/assets/svgs/setting.svg?url';
import Image from "next/image";
import ThemeExample from "@/components/theme-example/theme-example";

function ExamplePage() {
  return (
    <div className={styles['cp-example']}>
      Block 块级选择示例
      <div className={styles['cp-example__element']}>
        Element 元素选择示例
        <div className={styles['cp-example__element_modifier']}>Modifier 状态选择示例</div>
      </div>

      使用 Iconify 与项目内的Svg图标:
      <AppIcon icon="mdi-light:home" />
      <Image src={IconSettingUrl} alt="setting icon" />
  
      <ThemeExample />
    </div>
  );
}

ExamplePage.layout = 'test';

export default  ExamplePage;
