import { createApp } from 'vue';
import App from './App.vue';
import injectPlugins from './plugins';

const app = createApp(App);

injectPlugins(app).mount('#app');
