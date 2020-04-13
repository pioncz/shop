import { getPromotions, getPromotion } from '@/utils/api';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import * as getterTypes from './getter-types';

const promotions = {
  state: {
    promotionsList: [],
    promotionsLoading: false,
    promotionsError: false,
  },
  mutations: {
    [mutationTypes.SET_PROMOTIONS](state, newPromotions) {
      state.promotionsList = newPromotions;
    },
    [mutationTypes.SET_PROMOTIONS_LOADING](state, isLoading) {
      state.promotionsLoading = isLoading;
    },
    [mutationTypes.SET_PROMOTIONS_ERROR](state, error) {
      state.promotionsError = error;
    },
  },
  getters: {
    [getterTypes.GET_PROMOTIONS](state) {
      return state.promotionsList;
    },
    [getterTypes.GET_PROMOTIONS_LOADING](state) {
      return state.promotionsLoading;
    },
    [getterTypes.GET_PROMOTION](state) {
      return (promotionId) => state.promotionsList
        .find((promotion) => promotion.id === promotionId);
    },
    [getterTypes.GET_PROMOTIONS_ERROR](state) {
      return state.promotionsError;
    },
  },
  actions: {
    [actionTypes.FETCH_PROMOTIONS]({ state, commit }) {
      if (state.promotionsList.length) return;

      commit(mutationTypes.SET_PROMOTIONS_LOADING, true);
      getPromotions()
        .then((data) => {
          commit(mutationTypes.SET_PROMOTIONS, data);
        }, () => {
          commit(mutationTypes.SET_PROMOTIONS_ERROR, true);
        })
        .finally(() => {
          commit(mutationTypes.SET_PROMOTIONS_LOADING, false);
        });
    },
    [actionTypes.FETCH_PROMOTION]({ state, commit, getters }, promotionId) {
      const promotion = getters[getterTypes.GET_PROMOTION](promotionId);

      if (promotion) return;

      commit(mutationTypes.SET_PROMOTIONS_LOADING, true);
      getPromotion(promotionId)
        .then((data) => {
          commit(mutationTypes.SET_PROMOTIONS, [...state.promotionsList, data]);
        }, () => {
          commit(mutationTypes.SET_PROMOTIONS_ERROR, true);
        })
        .finally(() => {
          commit(mutationTypes.SET_PROMOTIONS_LOADING, false);
        });
    },
  },
};

export default promotions;
