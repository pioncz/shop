<template>
  <nav class="header">
    <div class="header__items container">
      <router-link to="/" exact>Home</router-link>
      <router-link to="/search">search</router-link>
      <router-link to="/admin">admin</router-link>
      <router-link to="/ddd">Not found</router-link>
      <div class="header__actions">
        <div v-show="userLoading">Loading</div>
        <router-link
          v-show="!user && !userLoading"
          to="/login"
          tag="button"
        >
          login
        </router-link>
        <router-link
        v-show="!user && !userLoading"
        to="/register"
        tag="button"
        >
          register
        </router-link>
        <div v-show="user">{{user && user.name}}</div>
        <div v-if="user" class="header__action">
          <button @click="toggle" :disabled="cartLoading">
            <AppLoader v-if="cartLoading" small />
            <template v-if="!cartLoading">{{cartProducts.length}} items</template>
          </button>
          <div v-click-outside="hide" v-show="opened" class="header__action-dropdown">
            <template v-if="cartProducts.length">
              <ul class="header__cart-products">
                <li
                  v-for="({ id, name, price }, index) in cartProducts"
                  :key="`${id}${index}`"
                >
                  <div>{{name}}</div><div>{{price}}$</div>
                </li>
                <li>
                  <div>Total:</div><div>{{cartTotalPrice}}$</div>
                </li>
              </ul>
              <button @click="onCheckoutClick">Checkout</button>
            </template>
            <template v-if="!cartProducts.length">
              <p>If you add something to cart, you can see it here</p>
            </template>
          </div>
        </div>
        <button v-show="user && !userLoading" @click="logout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import * as actionTypes from '@/store/action-types';
import * as getterTypes from '@/store/getter-types';
import { mapGetters } from 'vuex';
import AppLoader from '@/components/AppLoader.vue';

export default {
  name: 'TheHeader',
  components: {
    AppLoader,
  },
  data() {
    return {
      opened: false,
    };
  },
  computed: {
    ...mapGetters({
      user: getterTypes.GET_CURRENT_USER,
      userLoading: getterTypes.GET_CURRENT_USER_LOADING,
      cartProducts: getterTypes.GET_CART_LIST,
      cartLoading: getterTypes.GET_CART_LOADING,
      cartTotalPrice: getterTypes.GET_CART_TOTAL_PRICE,
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch(actionTypes.LOGOUT)
        .then(() => {
          this.$router.push('/login');
        });
    },
    toggle() {
      this.opened = true;
    },
    hide() {
      this.opened = false;
    },
    onCheckoutClick() {
      this.$router.push('/cart');
      this.hide();
    },
  },
  mounted() {
    this.popupItem = this.$el;
  },
  directives: {
    ClickOutside,
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

  &__items {
    height: 60px;
    display: flex;
    align-items: center;

    > a {
      padding: 19px 10px;
      color: $color;
      line-height: 22px;
      text-decoration: none;
      transition: background 0.2s ease-in-out;

      &.router-link-active {
        background: rgba(255, 255, 255, 0.3);
      }
      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }

  &__actions {
    flex: 1 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    > * {
      margin: 0 $margin1;
    }
  }

  &__action {
    position: relative;
  }

  &__action-dropdown {
    position: absolute;
    top: 100%;
    right: 0px;
    margin-top: 24px;
    background: $background;
    box-shadow: 0px 4px 12px 3px rgba(0, 0, 0, 0.25);
    min-width: 200px;
    padding: $margin2;
    border-radius: $borderRadius;

    &::after {
      content: '';
      position: absolute;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid $background;
      top:-10px;
      right: 20px;
    }
  }

  &__cart-products {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      justify-content: space-between;
      padding: $margin1 $margin0;

      &:nth-child(odd) {
        background: rgba(255, 255, 255, 0.4);
      }

      &:nth-child(even) {
        background: rgba(255, 255, 255, 0.2);
      }
    }

    li:last-child {
      margin-top: $margin0;
      margin-bottom: $margin1;
      border-top: 1px solid #fff;
      background: none;
    }
  }
}
</style>
