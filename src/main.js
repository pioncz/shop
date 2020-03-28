import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import App from './App.vue';

Vue.use(VueRouter);

// Routing logic
const router = new VueRouter({
  routes,
  mode: 'hash',
});

const app = new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
});

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname;
});
