import { getPromotions } from '@/utils/api';

const promotions = {
  namespaced: true,
  state: {
    promotions: [],
    loading: false,
  },
  mutations: {
    setPromotions(state, newPromotions) {
      state.promotions = newPromotions;
    },
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
  },
  getters: {
    promotions(state) {
      return state.promotions;
    },
    loading(state) {
      return state.loading;
    },
  },
  actions: {
    getPromotions({ state, commit }) {
      if (state.loading || state.promotions.length) return;

      commit('setLoading', true);
      getPromotions()
        .then((data) => {
          commit('setLoading', false);
          commit('setPromotions', data);
        })
        .catch(() => {
          commit('setLoading', false);
        });
    },
  },
};

export default promotions;
