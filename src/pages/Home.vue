<template>
  <div class="home">
    <router-link
      v-bind:to="`/promotion/${promotion.id}`"
      v-for="promotion in promotions"
      v-bind:key="promotion.id"
      class="promotion"
    >
      <PromotionTile
        v-bind:promotion="promotion"
      />
    </router-link>
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
        id: 1,
        header: 'Summer sale!',
        description: 'Only now 40% discount on summer products',
        image: 'promo1.jpg',
        colorFrom: 'rgba(245, 246, 252, 0.52)',
        colorTo: 'rgba(117, 19, 93, 0.73)',
        color: '#a5cadf',
      },
      {
        id: 2,
        header: 'Hot promotion!',
        description: 'Save 20% on premium items',
        image: 'promo2.jpg',
        colorFrom: 'rgba(245, 246, 252, 0.52)',
        colorTo: 'rgba(19, 118, 95, 0.73)',
        color: '#9abcc4',
      },
    ],
  }),
  methods: {
    dd() {
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
  text-decoration: none;
  display: block;
}
</style>
