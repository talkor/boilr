import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import VueCompositionApi from '@vue/composition-api';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faChartBar,
  faCog,
  faClock,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueMobileDetection from 'vue-mobile-detection';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Buefy);
Vue.use(VueMobileDetection);
Vue.use(VueCompositionApi);

library.add(faHome);
library.add(faChartBar);
library.add(faCog);
library.add(faClock);
library.add(faEnvelope);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSENGER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});
