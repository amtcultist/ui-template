import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/login/index.vue';
import Index from '@/views/index/index.vue';
import Profile from '@/views/profileIndex/index.vue';
import Landing from '@/views/landing/index.vue';
import MainNavbar from '@/layout/MainNavbar.vue';
import MainFooter from '@/layout/MainFooter.vue';
import LoginBg from '@/assets/img/profile_city.jpg';
Vue.use(Router);

/* Layout */
import Layout from '@/layout/Layout.vue';

/* Router Modules */
// import componentsRouter from './modules/components';
// import chartsRouter from './modules/charts';
// import tableRouter from './modules/table';
// import nestedRouter from './modules/nested';
// import panjiachenRoutes from './modules/panjiachen';
import roleRoutes from './modules/manage/role';
import genderRoutes from './modules/manage/gender';

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index'),
      },
    ],
  },
  {
    path: '/login',
    components: { default: Login, header: MainNavbar, footer: MainFooter },
    hidden: true,
    props: {
      header: { colorOnScroll: 400 },
    },
    meta: {
      bgImage: LoginBg,
    },
  },
  {
    path: '/',
    name: 'index',
    components: { default: Index, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: 'black' },
    },
  },
  {
    path: '/landing',
    name: 'landing',
    components: { default: Landing, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: 'black' },
    },
  },
  {
    path: '/profileIndex',
    name: 'profileIndex',
    components: { default: Profile, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: 'black' },
    },
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true,
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true },
      },
    ],
  },
  // ...panjiachenRoutes,
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true },
      },
    ],
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,
  {
    path: '/general',
    name: 'GeneralManagement',
    component: Layout,
    meta: {
      title: 'General Management',
      icon: 'international',
    },
    children: [genderRoutes, roleRoutes],
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
