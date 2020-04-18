import { getProducts } from '@/utils/api';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import * as getterTypes from './getter-types';

const products = {
  state: {
    productsList: [],
    productsLoading: false,
    productsError: null,
  },
  mutations: {
    [mutationTypes.SET_PRODUCTS_LIST](state, newList) {
      state.productsList = newList;
    },
    [mutationTypes.SET_PRODUCTS_LOADING](state, isLoading) {
      state.productsLoading = isLoading;
    },
    [mutationTypes.SET_PRODUCTS_ERROR](state, error) {
      state.productsError = error;
    },
  },
  getters: {
    [getterTypes.GET_PRODUCTS_LIST](state) {
      return state.productsList;
    },
    [getterTypes.GET_PRODUCTS_LOADING](state) {
      return state.productsLoading;
    },
    [getterTypes.GET_PRODUCTS_ERROR](state) {
      return state.productsError;
    },
  },
  actions: {
    [actionTypes.FETCH_PRODUCTS]({ state, commit }) {
      if (state.productsLoading || state.productsList.length) return;

      commit(mutationTypes.SET_PRODUCTS_LOADING, true);

      getProducts()
        .then((data) => {
          commit(mutationTypes.SET_PRODUCTS_LIST, data);
        })
        .catch(() => {
          commit(mutationTypes.SET_PRODUCTS_ERROR, 'Server error');
        })
        .finally(() => {
          commit(mutationTypes.SET_PRODUCTS_LOADING, true);
        });
    },
  },
};

export default products;
