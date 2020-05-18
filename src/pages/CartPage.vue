<template>
  <div class="page container cart-page">
    <transition
      name="slide-fade"
      mode="out-in"
    >
      <div v-if="!paymentCompleted" key="payment">
        <p>Step: {{step}} / 3</p>
        <div class="slider">
          <div :style="{ left }">
            <section>
              <h2>Cart</h2>
              <template v-if="cartProducts.length">
                <p>Confirm your product list</p>
                <ul class="products-list">
                  <li
                    v-for="({ id, image, name, price }, index) in cartProducts"
                    :key="`${id}${index}`"
                  >
                    <div
                      class="products-list__image"
                      :style="imageStyle(image)"
                    ></div>
                    <h3
                      class="products-list__name"
                    >
                      <router-link :to="`/product/${id}`">{{name}}</router-link>
                    </h3>
                    <h3
                      class="products-list__price"
                    >{{price}}$</h3>
                    <button
                      @click="() => removeCartProduct(id)"
                      :disabled="cartLoading"
                    >Remove</button>
                  </li>
                  <li>
                    <h3>Total: {{cartTotalPrice}}$</h3>
                  </li>
                </ul>
              </template>
              <template v-if="!cartProducts.length">
                <p>You have no products in the cart</p>
              </template>
            </section>
            <section>
              <h2>Delivery</h2>
              <p>Tell us where to deliver your products</p>
              <div class="delivery-form">
                <AppInput
                  v-model="fullname"
                  label="Fullname"
                  placeholder="John Doe"
                  :error="errors.fullname"
                />
                <AppInput
                  v-model="address"
                  label="Address"
                  placeholder="Street 20/20"
                  :error="errors.address"
                />
                <AppInput
                  v-model="city"
                  label="City"
                  placeholder="Warsaw"
                  :error="errors.city"
                />
                <AppInput
                  v-model="phoneNumber"
                  label="Phone number"
                  placeholder="111222333"
                  type="number"
                  :error="errors.phoneNumber"
                />
              </div>
            </section>
            <section>
              <h2>Payment</h2>
              <p>Choose desirable payment methods</p>
              <button
                class="payment-button"
                @click="pay"
                :disabled="paymentLoading"
              >
                <template v-if="!paymentLoading">Outside payment</template>
                <template v-if="paymentLoading"><AppLoader small /></template>
              </button>
            </section>
          </div>
        </div>
        <div>
          <button @click="previousStep" :disabled="previousDisabled">Wstecz</button>
          <button @click="nextStep" :disabled="nextDisabled" type="submit">Next</button>
        </div>
        <AppLoader v-show="cartLoading" />
      </div>
      <div v-if="paymentCompleted" key="thanks">
        <h2>Thank you</h2>
        <p>Your pruchase is completed. We have send you details on email.</p>
      </div>
    </transition>
  </div>
</template>

<script>
import AppLoader from '@/components/AppLoader.vue';
import AppInput from '@/components/AppInput.vue';
import * as actionTypes from '@/store/action-types';
import * as getterTypes from '@/store/getter-types';
import { mapGetters } from 'vuex';

export default {
  name: 'CartPage',
  components: {
    AppLoader,
    AppInput,
  },
  data() {
    return {
      step: 1,
      fullname: '',
      address: '',
      city: '',
      phoneNumber: null,
      errors: {},
      paymentLoading: false,
      paymentCompleted: false,
    };
  },
  computed: {
    ...mapGetters({
      cartProducts: getterTypes.GET_CART_LIST,
      cartLoading: getterTypes.GET_CART_LOADING,
      cartTotalPrice: getterTypes.GET_CART_TOTAL_PRICE,
    }),
    left() {
      return `${-(this.step - 1) * 100}%`;
    },
    previousDisabled() {
      return this.cartLoading || this.step <= 1;
    },
    nextDisabled() {
      return this.cartLoading || this.step >= 3 || !this.cartProducts.length;
    },
  },
  methods: {
    previousStep() {
      if (this.step <= 1) return;

      this.step -= 1;
    },
    nextStep() {
      if (this.step >= 3) return;

      if (this.step === 2) {
        if (this.validateForm()) {
          this.step += 1;
        }
      } else {
        this.step += 1;
      }
    },
    imageStyle(image) {
      return { background: `url(${require(`@/assets/${image}`)}) center center / contain no-repeat, #eee` };
    },
    removeCartProduct(productId) {
      this.$store.dispatch(actionTypes.DELETE_CART_PRODUCT, productId);
    },
    validateForm() {
      const errors = {};

      if (this.fullname.length < 6) {
        errors.fullname = 'Provide at least 6 characters';
      }

      if (!this.address.length) {
        errors.address = 'This field is required';
      }

      if (!this.city.length) {
        errors.city = 'This field is required';
      }

      if (!this.phoneNumber || this.phoneNumber.toString().length !== 9) {
        errors.phoneNumber = 'Provide exactly 9 digits';
      }

      this.errors = errors;

      return !Object.keys(errors).length;
    },
    pay() {
      this.paymentLoading = true;

      const paymentDetails = {
        fullname: this.fullname,
        address: this.address,
        city: this.city,
        phoneNumber: this.phoneNumber,
      };

      this.$store.dispatch(
        actionTypes.POST_CART_PAYMENT,
        paymentDetails,
      ).then(() => {
        this.paymentLoading = false;
        this.paymentCompleted = true;
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/consts.scss';

.cart-page {
  overflow: hidden;
}

.slider {
  overflow: hidden;

  > div {
    position: relative;
    transition: left ease-in-out 0.4s;
    display: flex;
    width: 100%;
  }

  section {
    width: 100%;
    flex-shrink: 0;
    height: 100%;
  }

  h2 {
    margin: $margin1 0;
  }

  .products-list {
    text-align: left;

    ul {
      list-style-type: none;
    }

    li {
      display: flex;
      align-items: center;
      margin: $margin1 0;
    }

    li:nth-child(even) {
      background: rgba(0, 0, 0, 0.05);
    }

    li:nth-child(odd) {
      background: rgba(0, 0, 0, 0.1);
    }

    li:last-child {
      border-top: 2px solid $color3;
      justify-content: flex-end;
      background: rgba(0, 0, 0, 0.1);
      padding: 0 $margin3;
    }

    &__image {
      display: block;
      width: 80px;
      height: 80px;
    }

    &__name {
      flex: 1 1;
      padding: 0 $margin1;
    }

    &__price {
      padding: 0 $margin1;
    }
  }

  .delivery-form {
    width: 50%;
    margin: 0 auto;
  }

  .payment-button {
    padding: $margin2 $margin3;
  }
}
</style>
