import I18nExample from '@/components/i18n-example/i18n-example';
import AppIcon from '@/components/app-icon/app-icon';
import ThemeExample from '@/components/theme-example/theme-example';
import SvgIcon from '@/components/app-icon/svg-icon';
import styles from './index.module.scss';

function ExamplePage() {
  return (
    <div className={styles['cp-example']}>
      Block 块级选择示例
      <div className={styles['cp-example__element']}>
        Element 元素选择示例
        <div className={styles['cp-example__element_modifier']}>Modifier 状态选择示例</div>
      </div>
      <br />
      使用 Iconify 与项目内的Svg图标:
      <AppIcon icon="mdi-light:home" />
      <SvgIcon icon="setting" />
      <br />
      <ThemeExample />
      <br />
      <I18nExample />
    </div>
  );
}

ExamplePage.layout = 'test';

export default ExamplePage;
