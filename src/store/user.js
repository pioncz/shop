import { login, logout, getCurrentUser } from '@/utils/api';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import * as getterTypes from './getter-types';

const user = {
  state: {
    userData: null,
  },
  mutations: {
    [mutationTypes.SET_CURRENT_USER](state, userData) {
      state.userData = userData;
    },
  },
  getters: {
    [getterTypes.GET_CURRENT_USER](state) {
      return state.userData;
    },
  },
  actions: {
    [actionTypes.POST_LOGIN]({ commit }, { email, password }) {
      login({ email, password })
        .then((userData) => {
          commit(mutationTypes.SET_CURRENT_USER, userData);
        });
    },
    [actionTypes.FETCH_CURRENT_USER]: ({ commit, getters }) => {
      if (getters.GET_CURRENT_USER) {
        return Promise.resolve();
      }
      return getCurrentUser().then((userData) => {
        commit(mutationTypes.SET_CURRENT_USER, userData);
      });
    },
  },
};

export default user;
