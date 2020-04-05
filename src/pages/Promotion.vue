<template>
  <div>
    <Loader v-show="loading" />
    <div v-show="!loading">
      <PromotionTile class="promotion" :promotion="promotion" />
      <p class="description">{{promotion.longDescription}}</p>
      <div class="finish">Promotion ends: {{finish}}</div>
      <div class="products">
        <ProductTile
          v-for="product in promotion.items"
          :key="product.id"
          :product="product"
          :onBuy="test"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PromotionTile from '@/components/PromotionTile.vue';
import ProductTile from '@/components/ProductTile.vue';
import store from '@/store/store';
import Loader from '@/components/Loader.vue';
import moment from 'moment';

export default {
  name: 'Promotion',
  components: {
    PromotionTile,
    ProductTile,
    Loader,
  },
  computed: {
    promotion() {
      return store.state.Promotion.data;
    },
    loading() {
      return store.state.Promotion.loading;
    },
    finish() {
      return this.promotion.finishCondition || moment(this.promotion.finishDate).format('Do MMMM YYYY');
    },
  },
  methods: {
    test() {
      console.log('x ');
    },
  },
  beforeCreate() {
    this.$store.dispatch('getPromotion', this.$route.params.id);
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
