<template>
  <nav class="the-header">
    <div class="the-header__items container">
      <router-link to="/" exact>Home</router-link>
      <router-link to="/search">Search</router-link>
      <router-link to="/cart">Cart</router-link>
      <router-link to="/admin">Admin</router-link>
      <router-link to="/ddd">Not found</router-link>
      <AppSelect
        v-model="$i18n.locale"
        :options="availableLocales"
      />
      <div class="the-header__actions">
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
        <div v-if="user" class="the-header__action">
          <PopupButton :disabled="cartLoading">
            <template v-slot:button>
              <button :disabled="cartLoading">
                <AppLoader v-if="cartLoading" small />
                <template v-if="!cartLoading">{{cartProducts.length}} items</template>
              </button>
            </template>
            <template v-slot:popup>
              <div class="the-header__action-dropdown">
                <template v-if="cartProducts.length">
                  <ul class="the-header__cart-products">
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
            </template>
          </PopupButton>
        </div>
        <button v-show="user && !userLoading" @click="logout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
import PopupButton from '@/components/PopupButton.vue';
import * as actionTypes from '@/store/action-types';
import * as getterTypes from '@/store/getter-types';
import { mapGetters } from 'vuex';
import AppLoader from '@/components/AppLoader.vue';
import AppSelect from '@/components/AppSelect.vue';

export default {
  name: 'TheHeader',
  components: {
    AppLoader,
    AppSelect,
    PopupButton,
  },
  computed: {
    ...mapGetters({
      user: getterTypes.GET_CURRENT_USER,
      userLoading: getterTypes.GET_CURRENT_USER_LOADING,
      cartProducts: getterTypes.GET_CART_LIST,
      cartLoading: getterTypes.GET_CART_LOADING,
      cartTotalPrice: getterTypes.GET_CART_TOTAL_PRICE,
    }),
    availableLocales() {
      return this.$i18n.availableLocales.map((locale) => ({ label: this.$t(`commons.${locale}`), value: locale }));
    },
  },
  methods: {
    logout() {
      this.$store.dispatch(actionTypes.LOGOUT)
        .then(() => {
          this.$router.push('/login');
        });
    },
    onCheckoutClick() {
      this.$router.push('/cart');
      this.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
