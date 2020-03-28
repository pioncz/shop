<template>
  <div id="app">
    <h1>Hello App!2</h1>
    <p>
      <router-link to="/">Go to Foo</router-link>
      <router-link to="/product">Go to Bar</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
};
</script>

<style lang="scss">
$test: red;

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: $test;
}

.router-link-exact-active {
  border-bottom: 2px solid #fff;
}
</style>
