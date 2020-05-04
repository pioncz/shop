import Vuex from 'vuex';
import Vue from 'vue';
import promotions from './promotions';
import promotion from './promotion';
import products from './products';
import similarProducts from './similar-products';
import user from './user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    promotions,
    promotion,
    products,
    similarProducts,
    user,
  },
  strict: process.env.NODE_ENV !== 'production',
});

export default store;
