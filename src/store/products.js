import { getProducts } from '@/utils/api';

const products = {
  namespaced: true,
  state: {
    products: [],
    loading: false,
  },
  mutations: {
    setProducts(state, items) {
      state.products = items;
    },
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
  },
  getters: {
    products(state) {
      return state.products;
    },
    loading(state) {
      return state.loading;
    },
  },
  actions: {
    getProducts({ state, commit }) {
      if (state.loading || state.products.length) return;

      commit('setLoading', true);

      getProducts()
        .then((data) => {
          commit('setLoading', false);
          commit('setProducts', data);
        })
        .catch(() => {
          commit('setLoading', false);
        });
    },
  },
};

export default products;
