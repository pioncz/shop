import { getProduct } from '@/utils/api';

const Product = {
  state: {
    data: {},
    loading: false,
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    },
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
  },
  actions: {
    getPromotion({ commit }, promotionId) {
      commit('setLoading', true);
      commit('setData', {});
      getProduct(promotionId)
        .then((data) => {
          commit('setLoading', false);
          commit('setData', data);
        })
        .catch(() => {
          commit('setLoading', false);
        });
    },
  },
};

export default Product;
