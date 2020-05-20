<template>
  <router-link class="product-tile card" :to="`/product/${product.id}`">
    <div class="product-tile__image" :style="imageStyle"></div>
    <h4 class="product-tile__title">{{product.name}}</h4>
    <AppRating :rate="product.rate" :ratesNumber="product.ratesNumber" />
    <div class="product-tile__price">{{product.price}}$</div>
  </router-link>
</template>

<script>
import AppRating from '@/components/AppRating.vue';

export default {
  name: 'ProductTile',
  props: {
    product: Object,
  },
  components: {
    AppRating,
  },
  computed: {
    imageStyle() {
      const imageUrl = require(`@/assets/${this.product.image}`);
      return {
        background: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/consts.scss';

.product-tile {
  display: block;
  max-width: 200px;
  transition: $transition;
  box-shadow: 0px 2px 0px 0px rgba(0,0,0,0);

  &:hover {
    box-shadow: 0px 4px 6px 3px rgba(0, 0, 0, 0.15);
  }

  &__title {
    margin: $margin1 0;
    font-size: $font2;
    text-align: left;
  }

  &__image {
    width: 100%;
    height: 120px;
  }

  &__rating-number {
    margin-left: $margin1;
    font-size: $font0;
    font-weight: bold;
  }

  &__price {
    text-align: right;
    font-size: $font2;
    margin-top: $margin1;
  }
}
</style>
