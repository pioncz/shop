<template>
  <div class="page">
    <h1>Search</h1>
    <input placeholder="search" />
    <button>Search</button>
    <select>
      <option>All</option>
      <option>Phone</option>
      <option>Laptop</option>
      <option>Tablet</option>
      <option>Desktop pc</option>
    </select>
    <div>
      Sort by:
      <select>
        <option>Name</option>
        <option>Price</option>
        <option>Rate</option>
      </select>
    </div>
    <p>{{loading}}</p>
    <p>{{products}}</p>
    <div class="products">
      <ProductTile
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProductTile from '@/components/ProductTile.vue';
import store from '@/store/store';

export default {
  name: 'Search',
  components: {
    ProductTile,
  },
  computed: {
    products() {
      return store.getters['products/products'];
    },
    loading() {
      return store.getters['products/loading'];
    },
  },
  beforeCreate() {
    this.$store.dispatch('products/getProducts');
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/consts.scss';

.products {
  display: flex;
  justify-content: flex-start;
  padding: $margin2 0;
  flex-wrap: wrap;

  > div {
    flex: 0 0 10%;
    margin: $margin1;
    width: 10%;
  }
}
</style>
