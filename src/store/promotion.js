import { getPromotion, getProduct } from '@/utils/api';

const Promotion = {
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
    getPromotion({ commit, dispatch }, promotionId) {
      commit('setLoading', true);
      commit('setData', {});
      getPromotion(promotionId)
        .then((data) => {
          const getPromises = data.items.map((productId) => getProduct(productId));
          Promise.all(getPromises).then((values) => {
            const returnData = { ...data, items: values };

            commit('setData', returnData);
            commit('setLoading', false);
          });
        })
        .catch(() => {
          commit('setLoading', false);
        });
    },
  },
};

export default Promotion;
