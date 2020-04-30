<template>
  <div class="page">
    <h1>Search</h1>
    <form @submit.prevent="handleSubmit">
      <input placeholder="Search by name" v-model="name" />
      <button type="submit">Search</button>
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
    </form>


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
import { mapGetters } from 'vuex';
import * as getterTypes from '@/store/getter-types';
import * as actionTypes from '@/store/action-types';

export default {
  name: 'Search',
  data() {
    return {
      name: this.$route.query.name || '',
    };
  },
  components: {
    ProductTile,
  },
  computed: {
    ...mapGetters({
      products: getterTypes.GET_PRODUCTS_LIST,
      loading: getterTypes.GET_PRODUCTS_LOADING,
    }),
  },
  beforeCreate() {
    this.$store.dispatch(actionTypes.FETCH_PRODUCTS);
  },
  methods: {
    handleSubmit() {
      console.log('submit');

      this.$router.push({
        name: 'search',
        query: {
          name: this.name,
        },
      });
    },
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
