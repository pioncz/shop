<template>
  <div class="hello">
    <h1>Home</h1>
    <button v-on:click="dd">Hi</button>
  </div>
</template>

<script>
import store from '../store';

export default {
  name: 'Home',
  methods: {
    dd() {
      console.log('x');
      store.commit('increment');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  background: green;
}
</style>
