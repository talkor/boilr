import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import VueCompositionApi from '@vue/composition-api';
import VueMobileDetection from 'vue-mobile-detection';
import Buefy from 'buefy';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/messaging';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import { postData } from '@/services/databaseService';

Vue.use(Buefy, {
  defaultIconPack: 'fas'
});

Vue.use(VueMobileDetection);
Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSENGER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.usePublicVapidKey(process.env.VUE_APP_MESSAGING_KEY_PAIR);
messaging
  .requestPermission()
  .then(() => {
    console.log('Notification permission granted.');
    messaging.getToken().then((token) => {
      postData({ collection: 'tokens', doc: 'token', data: { token } });
    });
  })
  .catch((err) => {
    console.log('Unable to get permission to notify.', err);
  });

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App)
    }).$mount('#app');
  }
});
