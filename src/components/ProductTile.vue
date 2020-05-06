<template>
  <div class="product-tile card">
    <div class="product-tile__image" v-bind:style="imageStyle"></div>
    <h4 class="product-tile__title">{{product.name}}</h4>
    <Rating class="product-tile__rating" :rate="product.rate" :ratesNumber="product.ratesNumber" />
    <div class="product-tile__price">{{product.price}}$</div>
    <button class="product-tile__buy" v-if="onBuy" v-on:click="onBuy">Kup teraz</button>
  </div>
</template>

<script>
import Rating from '@/components/Rating.vue';

export default {
  name: 'ProductTile',
  props: {
    product: Object,
    onBuy: Function,
  },
  components: {
    Rating,
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

  &__rating {

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

  &__buy {
    width: 100%;
  }
}
</style>
