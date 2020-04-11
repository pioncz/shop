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

export default {
  name: 'Home',
  components: {
    PromotionTile,
    Loader,
  },
  computed: {
    promotions() {
      return store.getters['promotions/promotions'];
    },
    loading() {
      return store.state.promotions.loading;
    },
  },
  beforeCreate() {
    store.dispatch('promotions/getPromotions');
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
