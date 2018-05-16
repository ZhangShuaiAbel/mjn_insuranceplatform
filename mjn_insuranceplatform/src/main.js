

import Vue from 'vue';
import vueRouter from 'vue-router';
import App from '@/App.vue';
import store from '@/vuex';
import { http } from '@/http';
import utils from './utils';
import router from '@/router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(http);
Vue.use(utils);
Vue.use(vueRouter);
Vue.use(iView);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

