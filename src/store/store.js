import Vuex from 'vuex';
import Vue from 'vue';
import Promotions from './promotions';
import Promotion from './promotion';
import Product from './product';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Promotions,
    Promotion,
    Product,
  },
});

export default store;
