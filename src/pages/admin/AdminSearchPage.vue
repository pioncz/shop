<template>
  <div class="container admin-search-page">
    <input placeholder="Search by id, name, price" v-model="query" />
    <AppSelect
      label="Sort by:"
      :options="sortOptions"
      v-model="sort"
    />
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="{id, name, price } in filteredProducts"
          :key="id"
          @click="onProductClick(id)"
        >
          <td>{{id}}</td>
          <td>{{name}}</td>
          <td>{{price}}</td>
        </tr>
      </tbody>
    </table>
    <AppLoader v-if="productsLoading" background />
  </div>
</template>

<script>
import AppSelect from '@/components/AppSelect.vue';
import AppLoader from '@/components/AppLoader.vue';
import { mapGetters } from 'vuex';
import * as getterTypes from '@/store/getter-types';
import * as actionTypes from '@/store/action-types';

export default {
  name: 'AdminSearchPage',
  components: {
    AppSelect,
    AppLoader,
  },
  data() {
    return {
      sortOptions: [
        { label: 'Name asc', value: 'name_asc' },
        { label: 'Name desc', value: 'name_desc' },
        { label: 'Price asc', value: 'price_asc' },
        { label: 'Price desc', value: 'price_desc' },
      ],
      sort: 'name_asc',
      query: '',
    };
  },
  computed: {
    ...mapGetters({
      products: getterTypes.GET_PRODUCTS_LIST,
      productsLoading: getterTypes.GET_PRODUCTS_LOADING,
    }),
    filteredProducts() {
      const query = this.query.toLowerCase();
      const products = this.products.filter(
        ({ id, name, price }) => id.indexOf(query) > -1
          || name.toLowerCase().indexOf(query) > -1
          || price.toString().indexOf(query) > -1,
      );
      const [column, order] = this.sort.split('_');

      products.sort((a, b) => {
        const multiplier = order === 'asc' ? 1 : -1;
        let value;

        if (typeof a[column] === 'string') {
          value = a[column].localeCompare(b[column]);
        } else {
          value = a[column] - b[column];
        }

        return multiplier * value;
      });

      return products;
    },
  },
  methods: {
    onProductClick(id) {
      this.$router.push(`/admin/${id}`);
    },
  },
  created() {
    this.$store.dispatch(actionTypes.FETCH_PRODUCTS);
  },
};
</script>

<style lang="scss">
@import '@/styles/consts.scss';

.admin-search-page {
  table {
    margin: $margin2 auto;
    text-align: left;
    border-spacing: 0px;
    width: 100%;
  }

  thead {
    background: #333;
    color: #fff;
  }

  th, td {
    padding: $margin2 $margin2 $margin2 $margin1;
    border-bottom: 1px solid #333;
  }

  tr:nth-child(even) {
    background: rgba(0,0,0,0.09);
  }

  tr:nth-child(odd) {
    background: rgba(0,0,0,0.04);
  }

  tbody tr:hover {
    background: rgba(0,0,0,0.15);
    cursor: pointer;
  }
}
</style>
