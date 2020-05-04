import { getProducts, getProduct, postRating } from '@/utils/api';
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
    [getterTypes.GET_PRODUCTS_BY_ID]: (state) => (productId) => state.productsList.find((product) => product.id === productId),
  },
  actions: {
    [actionTypes.FETCH_PRODUCT]({ state, commit, getters }, productId) {
      if (getters.GET_PRODUCTS_BY_ID(productId)) return;

      getProduct(productId).then((newProduct) => {
        commit(mutationTypes.SET_PRODUCTS_LIST, [...state.productsList, newProduct]);
      });
    },
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
    [actionTypes.POST_RATING](context, { rating, comment }) {
      return postRating(rating, comment);
    },
  },
};

export default products;
