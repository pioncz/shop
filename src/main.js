import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import axios from 'axios';
import App from './App.vue';
import routes from './routes';
import store from './store/store';
import * as getterTypes from './store/getter-types';
import * as actionTypes from './store/action-types';
import pl from './i18n/pl.json';
import en from './i18n/en.json';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'pl', // set locale
  messages: {
    pl,
    en,
  },
});

Vue.use(VueRouter);
Vue.config.productionTip = false;

// Routing logic
const router = new VueRouter({
  routes,
  // mode: 'hash',
  mode: 'history',
});

// Add a response interceptor
axios.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    store.dispatch(actionTypes.LOGOUT);
    router.push('/login');
  }

  return Promise.reject(error);
});

// eslint-disable-next-line
router.beforeEach(async (to, from, next) => {
  // Authentications:
  const securedRoute = to.matched.find((record) => record.meta.secured);
  if (securedRoute) {
    await store.dispatch(actionTypes.FETCH_CURRENT_USER).catch(() => {});
    const currentUser = store.getters[getterTypes.GET_CURRENT_USER];
    const { requiredRole } = securedRoute.meta;

    if (!currentUser || (requiredRole && currentUser.role !== requiredRole)) {
      return next({
        name: 'login',
        params: { nextUrl: to.fullPath },
      });
    }
  }

  // Page metadata:
  const matchedRoutes = to.matched.slice().reverse();
  const nearestWithTitle = matchedRoutes.find((r) => r.meta && r.meta.title);
  const nearestWithMeta = matchedRoutes.find((r) => r.meta && r.meta.metaTags);

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  }

  // remove old metatags
  [...document.querySelectorAll('[data-metatag]')]
    .map((el) => el.parentNode.removeChild(el));

  if (!nearestWithMeta) {
    return next();
  }

  nearestWithMeta.meta.metaTags.forEach((tagDef) => {
    const tag = document.createElement('meta');

    Object.entries(tagDef).forEach(([tagName, tagContent]) => {
      tag.setAttribute(tagName, tagContent);
    });

    tag.setAttribute('data-metatag', '');

    document.head.appendChild(tag);
  });

  next();
});

const app = new Vue({
  el: '#app',
  data: {
    title: 'Shop',
  },
  router,
  store,
  i18n,
  render: (h) => h(App),
});

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname;
});
