<template>
  <div class="product">
    <div class="product__image" v-bind:style="imageStyle"></div>
    <h4>{{product.name}}</h4>
    <Rating class="test" :score="product.rate" />
    <div>(3 opinie)</div>
    <div>{{product.price}}</div>
    <div>{{product.rate}} ({{product.ratesNumber}})</div>
  </div>
</template>

<script>
import Rating from '@/components/Rating.vue';

export default {
  name: 'ProductTile',
  props: ['product'],
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
.product {
  max-width: 200px;
  border: 1px solid #f3f3f3;
  border-radius: 2px;
  transition: 0.4s all ease-in-out;
  box-shadow: 0px 0px 0px 0px rgba(0,0,0,0);

  &:hover {
    box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.15);
  }

  &__image {
    width: 100%;
    height: 120px;
  }

  .test {
    height: 30px;
  }
}
</style>
