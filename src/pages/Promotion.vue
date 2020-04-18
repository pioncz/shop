<template>
  <div class="page">
    <AppLoader v-show="loading" />
    <div v-show="!loading">
      <PromotionTile class="promotion" :promotion="promotion" />
      <div class="container">
        <p class="description">{{promotion.longDescription}}</p>
        <div class="finish">Promotion ends: {{finish}}</div>
        <div class="products">
          <ProductTile
            v-for="product in promotion.items"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PromotionTile from '@/components/PromotionTile.vue';
import ProductTile from '@/components/ProductTile.vue';
import store from '@/store/store';
import AppLoader from '@/components/AppLoader.vue';
import moment from 'moment';
import * as getterTypes from '@/store/getter-types';
import * as actionTypes from '@/store/action-types';

export default {
  name: 'Promotion',
  components: {
    PromotionTile,
    ProductTile,
    AppLoader,
  },
  computed: {
    promotion() {
      return store.getters[getterTypes.GET_PROMOTION_DATA];
    },
    loading() {
      return store.getters[getterTypes.GET_PROMOTION_LOADING];
    },
    finish() {
      return this.promotion.id && (this.promotion.finishCondition || moment(this.promotion.finishDate).format('Do MMMM YYYY'));
    },
  },
  beforeCreate() {
    this.$store.dispatch(actionTypes.FETCH_PROMOTION, this.$route.params.id);
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/consts.scss';

.promotion {
  padding-top: 60px;
}

.description {
  margin: $margin4 $margin2;

  text-align: left;
}

.finish {
  background: $background-light;
  margin: $margin1;
  padding: $margin1 $margin3;
  font-size: $font2;
  font-weight: bold;
  border-radius: $borderRadius;
  text-align: right;
}

.products {
  display: flex;
  justify-content: space-around;
  padding: $margin2 0;

  > div {
    flex: 1 1;
  }
}
</style>
