<template>
  <div id="app">
    <TheHeader />
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view></router-view>
    </transition>
    <TheFooter />
  </div>
</template>

<script>
import * as actionTypes from '@/store/action-types';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
  },
  beforeCreate() {
    this.$store.dispatch(actionTypes.FETCH_CURRENT_USER);
    this.$store.dispatch(actionTypes.FETCH_CART);
  },
};
</script>

<style lang="scss">
@import 'styles/main.scss';
</style>
