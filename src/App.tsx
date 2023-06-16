import { ThemeContext, useThemeStore } from '@/stores';
import DemoIcon from '@/assets/svg/demo.svg';
import './App.scss';

function App() {
  const [count, setCount] = useState(0);
  const { theme } = useContext(ThemeContext);
  const { getThemeInstance } = useThemeStore();
  const { t, i18n } = useTranslation();

  function toggleTheme(themeKey: string) {
    getThemeInstance().toggle(themeKey);
  }

  function toggleLang(lang: string) {
    i18n.changeLanguage(lang);
  }

  return (
    <div className="cp-demo">
      <div>
        <span>
          <DemoIcon />
        </span>
        <span>
          <IconAntDesignSearchOutlined />
        </span>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          Vite
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          {/* <img src={reactLogo} className="logo react" alt="React logo" /> */}
        </a>
      </div>
      当前语言环境: {i18n.language}
      <h1>
        {t('message.common.test')}: {theme}
      </h1>
      <button onClick={() => toggleTheme('default')} type="button">
        切换默认主题
      </button>
      <br />
      <button onClick={() => toggleTheme('light')} type="button">
        切换亮色主题
      </button>
      <br />
      <button onClick={() => toggleTheme('dark')} type="button">
        切换暗黑主题
      </button>
      <br />
      <button onClick={() => toggleLang('en')} type="button">
        使用英语
      </button>
      <br />
      <button onClick={() => toggleLang('zh-CN')} type="button">
        使用中文
      </button>
      <br />
      <div className="card">
        <button onClick={() => setCount((c) => c + 1)} type="button">
          count is {count}
        </button>
        <p>
          Edit <code>src/App</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs underline">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
