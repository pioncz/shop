<template>
  <div class="page home-page">
    <ServerError v-show="errorVisible" @refresh="fetchPromotions" />
    <AppLoader v-show="loading" />
    <div v-show="listVisible">
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
import AppLoader from '@/components/AppLoader.vue';
import ServerError from '@/components/ServerError.vue';
import { mapGetters } from 'vuex';
import * as actionTypes from '@/store/action-types';
import * as getterTypes from '@/store/getter-types';

export default {
  name: 'HomePage',
  components: {
    PromotionTile,
    AppLoader,
    ServerError,
  },
  computed: {
    ...mapGetters({
      promotions: getterTypes.GET_PROMOTIONS_LIST,
      loading: getterTypes.GET_PROMOTIONS_LOADING,
      error: getterTypes.GET_PROMOTIONS_ERROR,
    }),
    listVisible() {
      return !this.loading && !this.error;
    },
    errorVisible() {
      return !this.loading && this.error;
    },
  },
  created() {
    this.fetchPromotions();
  },
  methods: {
    fetchPromotions() {
      this.$store.dispatch(actionTypes.FETCH_PROMOTIONS);
    },
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
