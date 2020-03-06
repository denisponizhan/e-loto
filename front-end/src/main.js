import Vue from 'vue';
import VueSocketIo from 'vue-socket.io';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(
  new VueSocketIo({
    debug: true,
    connection: 'http://localhost:3000/',
    vuex: {
      store,
      actionPrefix: 'socket_',
      mutationPrefix: 'socket_'
    },
    options: { path: '/socket.io' }
  })
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
