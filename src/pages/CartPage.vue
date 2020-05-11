<template>
  <div class="page container">
    <p>Step: {{step}} / 3</p>
    <div class="slider">
      <div :style="{ left }">
        <section>
          <h2>Cart</h2>
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
        </section>
        <section>
          <h2>Delivery</h2>
          <p>Tell us where to deliver your products</p>
          <form class="delivery-form">
            <AppInput
              v-model="fullname"
              label="Fullname"
              placeholder="John Doe"
            />
            <AppInput
              v-model="address"
              label="Address"
              placeholder="Street 20/20"
            />
            <AppInput
              v-model="city"
              label="City"
              placeholder="Warsaw"
            />
            <AppInput
              v-model="phoneNumber"
              label="Phone number"
              placeholder="111222333"
              type="number"
            />
          </form>
        </section>
        <section>
          <h2>Payment</h2>
          <p>Choose desirable payment methods</p>
        </section>
      </div>
    </div>
    <div>
      <button @click="previousStep" :disabled="cartLoading || step <= 1">Wstecz</button>
      <button @click="nextStep" :disabled="cartLoading || step >= 3">Next</button>
    </div>
    <AppLoader v-show="cartLoading" />
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
      step: 2,
      fullname: '',
      address: '',
      city: '',
      phoneNumber: 0,
      errors: {},
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
      return false;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/consts.scss';

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
}
</style>
