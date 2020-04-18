import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './routes';
import store from './store/store';
import * as getterTypes from './store/getter-types';

Vue.use(VueRouter);

// Routing logic
const router = new VueRouter({
  routes,
  // mode: 'hash',
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  const currentUser = store.getters[getterTypes.GET_CURRENT_USER];
  // Authentications:
  // if (to.matched.some((record) => record.meta.requiresAuth)) {
  //   if (localStorage.getItem('jwt') == null) {
  //     next({
  //       path: '/login',
  //       params: { nextUrl: to.fullPath },
  //     });
  //   } else {
  //     const user = JSON.parse(localStorage.getItem('user'));
  //     if (to.matched.some((record) => record.meta.is_admin)) {
  //       if (user.is_admin == 1) {
  //         next();
  //       } else {
  //         next({ name: 'userboard' });
  //       }
  //     } else {
  //       next();
  //     }
  //   }
  // } else if (to.matched.some((record) => record.meta.guest)) {
  //   if (localStorage.getItem('jwt') == null) {
  //     next();
  //   } else {
  //     next({ name: 'userboard' });
  //   }
  // } else {
  //   next();
  // }

  // Page metadata:

  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find((r) => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map((el) => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map((tagDef) => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach((key) => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

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
