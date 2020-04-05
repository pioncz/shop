<template>
  <div id="app">
    <Header />
    <transition
      name="fade"
      mode="out-in"
    >
      <div class="page">
        <router-view></router-view>
      </div>
    </transition>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import 'styles/main.scss';
@import '@/styles/consts.scss';

.page {
  max-width: $maxWidth;
  margin: 0 auto;
  padding-top: 60px;
  min-height: 100%;
  box-sizing: border-box;
  box-shadow: 0 0 5px 5px rgba(0,0,0,0.05);
}
</style>
