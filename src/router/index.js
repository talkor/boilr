import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Statistics from '../views/Statistics.vue';
import Settings from '../views/Settings.vue';
import Login from '../views/Login.vue';
import EmailLogin from '../views/EmailLogin.vue';
import Register from '../views/Register.vue';
import Schedule from '../views/Schedule.vue';
import * as firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/login/email',
    name: 'Email Login',
    component: EmailLogin
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
