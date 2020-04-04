import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './routes';
import store from './store/store';

Vue.use(VueRouter);

// Routing logic
const router = new VueRouter({
  routes,
  mode: 'hash',
});

const app = new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname;
});
