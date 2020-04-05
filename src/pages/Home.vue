<template>
  <div class="home">
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
      return store.state.Promotions.items;
    },
    loading() {
      return store.state.Promotions.loading;
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
  height: 100%;
}

.promotion {
  margin: $margin4;
  text-decoration: none;
  display: block;
}
</style>
