import { getPromotions } from '@/utils/api';

const Promotions = {
  state: {
    items: [],
    loading: false,
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
  },
  getters: {
  },
  actions: {
    getPromotions({ commit }) {
      commit('setLoading', true);
      getPromotions()
        .then((data) => {
          commit('setLoading', false);
          commit('setItems', data);
        })
        .catch(() => {
          commit('setLoading', false);
        });
    },
  },
};

export default Promotions;
