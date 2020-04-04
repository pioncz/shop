import Vuex from 'vuex';
import Vue from 'vue';
import Promotions from './promotions';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Promotions,
  },
});

export default store;
