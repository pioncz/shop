<template>
  <div class="admin-product-page container">
    <ProductBigTile
      v-if="!loading"
      :product="product"
      editable
      @change="onProductChange"
      ref="product-big-tile"
    />
    <AppLoader v-if="loading" />
    <div class="admin-product-page__toolbar">
      <button @click="goBack">Delete</button>
      <button @click="discardChanges">Discard</button>
      <button @click="goBack">Save</button>
    </div>
  </div>
</template>

<script>
import ProductBigTile from '@/components/ProductBigTile.vue';
import AppLoader from '@/components/AppLoader.vue';
import * as actionTypes from '@/store/action-types';
import * as getterTypes from '@/store/getter-types';

export default {
  name: 'AdminProductPage',
  components: {
    ProductBigTile,
    AppLoader,
  },
  data() {
    return {
      editor: null,
      editedProduct: null,
    };
  },
  computed: {
    product() {
      return this.$store.getters[getterTypes.GET_PRODUCTS_BY_ID](this.$route.params.id) || {};
    },
    loading() { return !this.product.name; },
  },
  methods: {
    goBack() {
      this.$router.push('/admin');
    },
    onProductChange(product) {
      console.log(product);
    },
    discardChanges() {
      this.$refs['product-big-tile'].discardChanges();
    },
  },
  created() {
    this.$store.dispatch(actionTypes.FETCH_PRODUCT, this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/consts.scss';

.admin-product-page {
  &__toolbar {
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0px 4px 8px 1px #999;
    border-radius: 2px;
    background: #fff;
    padding: $margin0 $margin2;
  }
}
</style>
