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
      <AppRating
        class="product-big-tile__app-rating"
        :rate="editedProduct.rate"
        :ratesNumber="editedProduct.ratesNumber"
      />
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
        @click="onBuyClick"
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
import AppRating from '@/components/AppRating.vue';
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
    AppRating,
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
    onBuyClick() {
      this.$emit('buy-product');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
