import Vue from 'vue';
import VueSocketIo from 'vue-socket.io';
import App from '@/vue/App.vue';
import router from './vue-router';
import store from './vuex';
import Antd from 'ant-design-vue';
import VueVirtualScroller from 'vue-virtual-scroller';

import 'ant-design-vue/dist/antd.css';

Vue.use(Antd);
Vue.use(VueVirtualScroller);
Vue.config.productionTip = false;

Vue.use(
  new VueSocketIo({
    debug: true,
    connection: 'http://localhost:3003',
    vuex: {
      store,
      actionPrefix: 'socket_',
      mutationPrefix: 'socket_',
    },
    options: { path: '/socket.io' },
  })
);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
