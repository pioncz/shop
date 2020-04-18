import { getPromotion, getProduct } from '@/utils/api';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import * as getterTypes from './getter-types';

const promotion = {
  state: {
    promotionData: {},
    promotionId: null,
    promotionLoading: false,
    promotionError: null,
  },
  mutations: {
    [mutationTypes.SET_PROMOTION_DATA](state, newPromotion) {
      state.promotionData = newPromotion;
    },
    [mutationTypes.SET_PROMOTION_ID](state, promotionId) {
      state.promotionId = promotionId;
    },
    [mutationTypes.SET_PROMOTION_LOADING](state, isLoading) {
      state.promotionLoading = isLoading;
    },
    [mutationTypes.SET_PROMOTION_ERROR](state, error) {
      state.promotionError = error;
    },
  },
  getters: {
    [getterTypes.GET_PROMOTION_LOADING](state) {
      return state.promotionLoading;
    },
    [getterTypes.GET_PROMOTION_DATA](state) {
      return state.promotionData;
    },
    [getterTypes.GET_PROMOTION_ERROR](state) {
      return state.promotionError;
    },
  },
  actions: {
    [actionTypes.FETCH_PROMOTION]({ state, commit, getters }, promotionId) {
      if (state.promotionId === promotionId) return;

      commit(mutationTypes.SET_PROMOTION_ID, promotionId);
      commit(mutationTypes.SET_PROMOTION_LOADING, true);
      commit(mutationTypes.SET_PROMOTION_DATA, {});

      const promotionFromStore = getters[getterTypes.GET_PROMOTIONS_BY_ID](promotionId);

      const handlePromotion = (promotionData) => {
        const fetchPromises = promotionData.items.map((productId) => getProduct(productId));
        Promise.all(fetchPromises).then((values) => {
          const returnData = { ...promotionData, items: values };

          commit(mutationTypes.SET_PROMOTION_DATA, returnData);
          commit(mutationTypes.SET_PROMOTION_LOADING, false);
        });
      };

      if (promotionFromStore) {
        handlePromotion(promotionFromStore);
      } else {
        getPromotion(promotionId)
          .then((data) => {
            handlePromotion(data);
          })
          .catch(() => {
            commit(mutationTypes.SET_PROMOTION_ERROR, 'Server error');
            commit(mutationTypes.SET_PROMOTION_LOADING, false);
          });
      }
    },
  },
};

export default promotion;
