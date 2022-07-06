import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('~/views/home/home.vue');
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
  next();
});

router.afterEach(() => {
});

export default router;
