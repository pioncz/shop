import { getCart } from '@/utils/api';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import * as getterTypes from './getter-types';

const cart = {
  state: {
    cartList: [],
    cartLoading: false,
    cartError: null,
  },
  mutations: {
    [mutationTypes.SET_CART_LIST](state, newList) {
      state.cartList = newList;
    },
    [mutationTypes.SET_CART_LOADING](state, isLoading) {
      state.cartLoading = isLoading;
    },
    [mutationTypes.SET_CART_ERROR](state, error) {
      state.cartError = error;
    },
  },
  getters: {
    [getterTypes.GET_CART_LIST](state) {
      return state.cartList;
    },
    [getterTypes.GET_CART_LOADING](state) {
      return state.cartLoading;
    },
    [getterTypes.GET_CART_ERROR](state) {
      return state.cartError;
    },
  },
  actions: {
    [actionTypes.FETCH_CART]({ commit }) {
      commit(mutationTypes.SET_CART_LOADING, true);

      getCart()
        .then((data) => {
          commit(mutationTypes.SET_CART_LIST, data.products);
        })
        .catch(() => {
          commit(mutationTypes.SET_CART_ERROR, 'Server error');
        })
        .finally(() => {
          commit(mutationTypes.SET_CART_LOADING, false);
        });
    },
  },
};

export default cart;
