<template>
  <div class="page promotion-page">
    <ServerError v-show="errorVisible" @refresh="fetchPromotion" />
    <AppLoader v-show="loading" />
    <div v-show="promotionVisible">
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
import AppLoader from '@/components/AppLoader.vue';
import ServerError from '@/components/ServerError.vue';
import moment from 'moment';
import { mapGetters } from 'vuex';
import * as getterTypes from '@/store/getter-types';
import * as actionTypes from '@/store/action-types';

export default {
  name: 'PromotionPage',
  components: {
    PromotionTile,
    ProductTile,
    AppLoader,
    ServerError,
  },
  computed: {
    ...mapGetters({
      promotion: getterTypes.GET_PROMOTION_DATA,
      loading: getterTypes.GET_PROMOTION_LOADING,
      error: getterTypes.GET_PROMOTION_ERROR,
    }),
    finish() {
      return this.promotion.id && (this.promotion.finishCondition || moment(this.promotion.finishDate).format('Do MMMM YYYY'));
    },
    promotionVisible() {
      return !this.error && !this.loading;
    },
    errorVisible() {
      return this.error && !this.loading;
    },
  },
  created() {
    this.fetchPromotion();
  },
  methods: {
    fetchPromotion() {
      this.$store.dispatch(actionTypes.FETCH_PROMOTION, this.$route.params.id);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
