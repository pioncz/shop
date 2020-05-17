<template>
  <div class="product-big-tile">
    <div class="product-big-tile__left" :style="imageStyle">
    </div>
    <div class="product-big-tile__right">
      <LiveEdit
        component="h2"
        :value="editedProduct.name"
        @change="onInput('name', $event)"
        editable
      />
      <Rating class="product-big-tile__rating" :rate="editedProduct.rate" :ratesNumber="editedProduct.ratesNumber" />
      <LiveEdit
        component="p"
        :value="editedProduct.description"
        @change="onInput('description', $event)"
        editable
        type="textarea"
      />
      <h3>Specification:</h3>
      <ul class="product-big-tile__specification">
        <li v-for="(item, key) in editedProduct.specification" :key="key">
          <b>{{key}}</b>: {{item.join ? item.join(', ') : item}}
        </li>
      </ul>
      <h3>Price:</h3>
      <p class="product-big-tile__price">{{editedProduct.price}}$</p>
      <button
        v-if="buyVisible"
        @click="$emit('buyProduct')"
        :disabled="buyLoading"
        class="product-big-tile__buy-button"
      >
        <template v-if="buyLoading"><AppLoader small /></template>
        <template v-if="!buyLoading">Buy now</template>
      </button>
    </div>
  </div>
</template>

<script>
import Rating from '@/components/Rating.vue';
import AppLoader from '@/components/AppLoader.vue';
import LiveEdit from '@/components/LiveEdit.vue';

export default {
  name: 'ProductBigTile',
  props: {
    product: Object,
    buyVisible: Boolean,
    buyLoading: Boolean,
    editable: Boolean,
  },
  components: {
    Rating,
    AppLoader,
    LiveEdit,
  },
  data() {
    return {
      editedProduct: { ...this.product },
    };
  },
  computed: {
    imageStyle() {
      return { background: `url(${require(`@/assets/${this.product.image}`)}) center center / contain no-repeat, #eee` };
    },
  },
  methods: {
    onInput(key, value) {
      this.editedProduct[key] = value;
      this.$emit('change', this.editedProduct);
    },
    discardChanges() {
      this.editedProduct = { ...this.product };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/consts.scss';

.product-big-tile {
  display: flex;
  margin: $margin2 auto;

  &__left {
    flex: 1 1 60%;
  }

  &__right {
    flex: 0 0 40%;
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 0 $margin2;

    > * {
      margin: 0 0 $margin1 !important;
    }
  }

  &__rating {
    height: 30px;
  }

  &__specification {
    list-style: none;
    padding-left: 0;
  }

  &__buy-button > div {
    margin: 0 auto;
  }
}
</style>
