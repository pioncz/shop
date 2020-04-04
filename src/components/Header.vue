<template>
  <div class="header">
    <router-link to="/">Home</router-link>
    <router-link to="/promotion/1">Promotion 1</router-link>
    <router-link to="/product">Product</router-link>
    <router-link to="/cart">cart</router-link>
    <router-link to="/category">category</router-link>
    <router-link to="/contact">contact</router-link>
    <router-link to="/login">login</router-link>
    <router-link to="/register">register</router-link>
    <router-link to="/search">search</router-link>
    <router-link to="/admin">admin</router-link>
    <router-link to="/ddd">Not found</router-link>

    <div>Login / register</div>
    <div>0 items in the bad,yo</div>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style lang="scss" scoped>
@import '@/styles/consts.scss';

.header {
  display: flex;
  padding: 20px;
  background: $background;
  color: $color;

  a {
    color: $color;
    margin: 0 10px;
    text-decoration: none;
  }

  .router-link-exact-active {
    border-bottom: 2px solid #fff;
  }
}
</style>
