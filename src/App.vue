<template>
  <div id="app">
    <Header />
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view></router-view>
    </transition>
    <Footer />
  </div>
</template>

<script>
import * as actionTypes from '@/store/action-types';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  beforeCreate() {
    this.$store.dispatch(actionTypes.FETCH_CURRENT_USER);
  },
};
</script>

<style lang="scss">
@import 'styles/main.scss';
</style>
