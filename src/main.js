import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './routes';
import store from './store/store';
import * as getterTypes from './store/getter-types';
import * as actionTypes from './store/action-types';

Vue.use(VueRouter);
Vue.config.productionTip = false;

// Routing logic
const router = new VueRouter({
  routes,
  // mode: 'hash',
  mode: 'history',
});

router.beforeEach(async (to, from, next) => {
  // Authentications:
  if (to.matched.some((record) => record.meta.secured)) {
    await store.dispatch(actionTypes.FETCH_CURRENT_USER).catch(() => {});
    const currentUser = store.getters[getterTypes.GET_CURRENT_USER];

    if (!currentUser) {
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
  render: (h) => h(App),
});

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname;
});
