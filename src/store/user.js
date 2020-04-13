import { login, logout, getCurrentUser } from '@/utils/api';

const user = {
  namespaced: true,
  state: {
    isAuthenticated: false,
    userData: null,
  },
  mutations: {
    setCurrentUser(state, userData) {
      state.userData = userData;
      state.isAuthenticated = true;
    },
  },
  getters: {
    getCurrentUser: (state) => state.userData,
  },
  actions: {
    login({ commit }, { email, password }) {
      login({ email, password })
        .then((userData) => {
          commit('setCurrentUser', userData);
        });
    },
    validateUser({ commit }) {
      getCurrentUser().then((userData) => {
        commit('setCurrentUser', userData);
      });
    },
  },
};

export default user;
