<template>
  <div class="page home-page">
    <Loader v-show="loading" />
    <div v-show="!loading">
      <router-link
        :to="`/promotion/${promotion.id}`"
        v-for="promotion in promotions"
        :key="promotion.id"
        class="promotion"
      >
        <PromotionTile
          :promotion="promotion"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import PromotionTile from '@/components/PromotionTile.vue';
import store from '@/store/store';
import Loader from '@/components/Loader.vue';
import * as getterTypes from '@/store/getter-types';
import * as actionTypes from '@/store/action-types';

export default {
  name: 'Home',
  components: {
    PromotionTile,
    Loader,
  },
  computed: {
    promotions() {
      return store.getters[getterTypes.GET_PROMOTIONS_LIST];
    },
    loading() {
      return store.getters[getterTypes.GET_PROMOTIONS_LOADING];
    },
  },
  beforeCreate() {
    store.dispatch(actionTypes.FETCH_PROMOTIONS);
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/consts.scss';

.home-page {
  height: 100%;
}

.promotion {
  margin: $margin4;
  text-decoration: none;
  display: block;
}
</style>
