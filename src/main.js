import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import VueCompositionApi from '@vue/composition-api';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faChartBar, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueMobileDetection from 'vue-mobile-detection';

Vue.use(VueMobileDetection);
Vue.use(VueCompositionApi);

library.add(faHome);
library.add(faChartBar);
library.add(faCog);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
