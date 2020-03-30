<template>
  <div class="home">
    <PromotionTile
      v-for="promotion in promotions"
      v-bind:key="promotion.id"
      v-bind:promotion="promotion"
      class="promotion"
    />
    <button v-on:click="dd">Hi</button>
  </div>
</template>

<script>
import PromotionTile from '@/components/PromotionTile.vue';
import store from '../store';

export default {
  name: 'Home',
  components: {
    PromotionTile,
  },
  data: () => ({
    promotions: [
      {
        header: 'Summer sale!',
        description: 'Only now 40% discount on summer products',
        image: 'promo1.jpg',
        colorFrom: 'rgba(245, 246, 252, 0.52)',
        colorTo: 'rgba(117, 19, 93, 0.73)'
      },
      {
        header: 'Hot promotion!',
        description: 'Save 20% on premium items',
        image: 'promo2.jpg',
        colorFrom: 'rgba(245, 246, 252, 0.52)',
        colorTo: 'rgba(19, 118, 95, 0.73)'
      },
    ],
  }),
  methods: {
    dd() {
      console.log('x');
      store.commit('increment');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/consts.scss';

.home {
  max-width: $maxWidth;
  margin: 0 auto;
}

.promotion {
  margin: $margin1;
}
</style>
