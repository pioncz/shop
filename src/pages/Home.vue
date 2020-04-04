<template>
  <div class="home">
    <div v-show="loading" class="loader-container">
      <Loader />
    </div>
    <div v-show="!loading">
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
      return store.state.Promotions.items;
      // return [];
    },
    loading() {
      return store.state.Promotions.loading;
      // return true;
    },
  },
  methods: {
    dd() {
      store.commit('increment');
    },
  },
  beforeCreate() {
    this.$store.dispatch('getPromotions');
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/consts.scss';

.home {
  max-width: $maxWidth;
  margin: 0 auto;
  height: calc(100% - 61px);
}

.promotion {
  margin: $margin4;
  text-decoration: none;
  display: block;
}

.loader-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
