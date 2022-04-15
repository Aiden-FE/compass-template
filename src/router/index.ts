import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';

const Home = { template: '<div>Home</div>' };
const About = { template: '<div>About</div>' };

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!NProgress.isStarted()) {
    NProgress.start();
  }
  next()
});

router.afterEach((to, from) => {
  NProgress.done();
});

export default router;
