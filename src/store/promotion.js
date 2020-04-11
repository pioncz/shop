import { getPromotion, getProduct } from '@/utils/api';

const promotion = {
  namespaced: true,
  state: {
    promotion: null,
    loading: false,
  },
  mutations: {
    setPromotion(state, newPromotion) {
      state.promotion = newPromotion;
    },
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
  },
  getters: {
    loading: (state) => state.loading,
    getPromotion: (state) => (promotionId) => {
      if (state.promotion && state.promotion.id === promotionId) {
        return state.promotion;
      }
    },
  },
  actions: {
    getPromotion({ state, commit }, promotionId) {
      if (state.promotion && state.promotion.id === promotionId) return;

      commit('setLoading', true);
      commit('setPromotion', {});
      getPromotion(promotionId)
        .then((data) => {
          const getPromises = data.items.map((productId) => getProduct(productId));
          Promise.all(getPromises).then((values) => {
            const returnData = { ...data, items: values };

            commit('setPromotion', returnData);
            commit('setLoading', false);
          });
        })
        .catch(() => {
          commit('setLoading', false);
        });
    },
  },
};

export default promotion;
