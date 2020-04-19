<template>
  <nav class="header">
    <div class="container">
      <router-link to="/" exact>Home</router-link>
      <router-link to="/product">Product</router-link>
      <router-link to="/cart">cart</router-link>
      <router-link to="/category">category</router-link>
      <router-link to="/contact">contact</router-link>
      <router-link to="/login">login</router-link>
      <router-link to="/register">register</router-link>
      <router-link to="/search">search</router-link>
      <router-link to="/admin">admin</router-link>
      <router-link to="/ddd">Not found</router-link>
      <div>
        <div v-show="loading">Loading</div>
        <div v-show="!user && !loading">Login / register</div>
        <div v-show="user && !loading">0 items</div>
        <button v-show="user && !loading" @click="logout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
import * as actionTypes from '@/store/action-types';
import * as getterTypes from '@/store/getter-types';
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapGetters({
      user: getterTypes.GET_CURRENT_USER,
      loading: getterTypes.GET_CURRENT_USER_LOADING,
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch(actionTypes.LOGOUT)
        .then(() => {
          this.$router.push('/login');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/consts.scss';

.header {
  background: $background;
  color: $color;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9000;
  height: 60px;
  box-sizing: border-box;

  .container {
    height: 60px;
    display: flex;
    align-items: center;

    a {
      padding: 5px;
      color: $color;
      line-height: 22px;
      text-decoration: none;
    }

    .router-link-active {
      border-bottom: 2px solid #fff;
    }

    & > div:last-child {
      flex: 1 1;
      text-align: right;
    }
  }
}
</style>
