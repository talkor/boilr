import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Auth/Login';
import EmailLogin from '@/views/Auth/EmailLogin';
import Register from '@/views/Auth/Register';
import Home from '@/views/Home/Home';
import Shower from '@/views/Home/Shower';
import Statistics from '@/views/Statistics/Statistics';
import Schedule from '@/views/Schedule/Schedule';
import Settings from '@/views/Settings/Settings';
import Device from '@/views/Settings/Device';
import Demo from '@/views/Demo/Demo';
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
    path: '/shower',
    name: 'Shower',
    component: Shower,
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
    },
    props: true
  },
  {
    path: '/settings/device',
    name: 'Device',
    component: Device,
    meta: {
      requiresAuth: true
    },
    props: true
  },
  {
    path: '/demo',
    name: 'Demo',
    component: Demo
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
