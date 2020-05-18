<template>
  <div class="page">
    <form @submit.prevent="onSubmit">
      <input placeholder="Search by name" v-model="name" />
      <AppSelect
        label="Category:"
        :options="categoriesOptions"
        v-model="category"
      />
      <AppSelect
        label="Sort by:"
        :options="sortOptions"
        v-model="sort"
      />
      <button type="submit">Search</button>
    </form>
    <div class="products container">
      <ProductTile
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
    <AppPagination
      v-model="page"
      :totalPages="totalPages"
      @input="onSubmit"
    />
    <AppLoader v-show="loading" background />
  </div>
</template>

<script>
import ProductTile from '@/components/ProductTile.vue';
import AppSelect from '@/components/AppSelect.vue';
import AppLoader from '@/components/AppLoader.vue';
import AppPagination from '@/components/AppPagination.vue';
import { mapGetters } from 'vuex';
import * as getterTypes from '@/store/getter-types';
import * as actionTypes from '@/store/action-types';

export default {
  name: 'Search',
  components: {
    ProductTile,
    AppSelect,
    AppLoader,
    AppPagination,
  },
  data() {
    return {
      name: this.$route.query.name || '',
      category: this.$route.query.category || 'DESKTOP',
      sortOptions: [
        { label: 'Name asc', value: 'name_asc' },
        { label: 'Name desc', value: 'name_desc' },
        { label: 'Price asc', value: 'price_asc' },
        { label: 'Price desc', value: 'price_desc' },
        { label: 'Rate asc', value: 'rate_asc' },
        { label: 'Rate desc', value: 'rate_desc' },
      ],
      sort: this.$route.query.sort || 'name_asc',
      page: +this.$route.query.page || 1,
      limit: 10,
    };
  },
  computed: {
    ...mapGetters({
      products: getterTypes.GET_PRODUCTS_LIST,
      productsTotal: getterTypes.GET_PRODUCTS_TOTAL,
      productsLoading: getterTypes.GET_PRODUCTS_LOADING,
      categories: getterTypes.GET_CATEGORIES_LIST,
      categoriesLoading: getterTypes.GET_CATEGORIES_LOADING,
    }),
    categoriesOptions() {
      return [
        ...(this.categories.length ? [{ label: 'All', value: 'ALL' }] : []),
        ...this.categories.map((category) => ({
          label: category.charAt(0) + category.slice(1).toLowerCase(),
          value: category,
        })),
      ];
    },
    loading() {
      return this.productsLoading || this.categoriesLoading;
    },
    totalPages() {
      return Math.ceil(this.productsTotal / this.limit);
    },
  },
  created() {
    this.$store.dispatch(actionTypes.FETCH_CATEGORIES)
      .then(() => {
        this.fetchProducts();
      });
  },
  methods: {
    onSubmit() {
      this.fetchProducts();
      this.updateUrl();
    },
    fetchProducts() {
      const [sortColumn, sortOrder] = this.sort.split('_');

      const options = {
        ...(this.name && { name: this.name }),
        ...(this.category !== 'ALL' && { category: this.category }),
        ...(this.sort && { _sort: sortColumn, _order: sortOrder }),
        _limit: this.limit,
        _page: this.page,
      };

      this.$store.dispatch(actionTypes.FETCH_PRODUCTS, options);
    },
    updateUrl() {
      const options = {
        ...(this.name && { name: this.name }),
        ...(this.category !== 'ALL' && { category: this.category }),
        ...(this.sort && { sort: this.sort }),
        page: this.page,
      };

      this.$router.push({
        name: 'search',
        query: options,
      }).catch(() => {});
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/consts.scss';

form {
  margin: $margin2 0;
}

.products {
  display: flex;
  justify-content: flex-start;
  padding: $margin2 0;
  flex-wrap: wrap;

  > a {
    flex: 1 1 200px;
    width: 200px;
    margin: $margin1;
    max-width: 360px;
  }
}
</style>
