import { getSimilarProducts } from '@/utils/api';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import * as getterTypes from './getter-types';

const products = {
  state: {
    similarProductsProductId: null,
    similarProductsList: [],
    similarProductsLoading: false,
    similarProductsError: null,
  },
  mutations: {
    [mutationTypes.SET_SIMILAR_PRODUCTS_LIST](state, newList) {
      state.similarProductsList = newList;
    },
    [mutationTypes.SET_SIMILAR_PRODUCTS_LOADING](state, isLoading) {
      state.similarProductsLoading = isLoading;
    },
    [mutationTypes.SET_SIMILAR_PRODUCTS_ERROR](state, error) {
      state.similarProductsError = error;
    },
    [mutationTypes.SET_SIMILAR_PRODUCTS_PRODUCT_ID](state, productId) {
      state.similarProductsProductId = productId;
    },
  },
  getters: {
    [getterTypes.GET_SIMILAR_PRODUCTS_LIST](state) {
      return state.similarProductsList;
    },
    [getterTypes.GET_SIMILAR_PRODUCTS_LOADING](state) {
      return state.similarProductsLoading;
    },
    [getterTypes.GET_SIMILAR_PRODUCTS_ERROR](state) {
      return state.similarProductsError;
    },
  },
  actions: {
    [actionTypes.FETCH_SIMILAR_PRODUCTS]({ state, commit }, productId) {
      if (state.similarProductsProductId === productId) return;

      commit(mutationTypes.SET_SIMILAR_PRODUCTS_PRODUCT_ID, productId);
      commit(mutationTypes.SET_SIMILAR_PRODUCTS_LOADING, true);
      commit(mutationTypes.SET_SIMILAR_PRODUCTS_ERROR, null);
      commit(mutationTypes.SET_SIMILAR_PRODUCTS_LIST, []);

      getSimilarProducts(productId)
        .then((data) => {
          commit(mutationTypes.SET_SIMILAR_PRODUCTS_LIST, data);
        })
        .catch(() => {
          commit(mutationTypes.SET_SIMILAR_PRODUCTS_ERROR, 'Server error');
          commit(mutationTypes.SET_SIMILAR_PRODUCTS_PRODUCT_ID, null);
        })
        .finally(() => {
          commit(mutationTypes.SET_SIMILAR_PRODUCTS_LOADING, false);
        });
    },
  },
};

export default products;
