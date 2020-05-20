<template>
  <div class="page product-page">
    <template v-if="!loading">
      <section class="product container card" v-if="!loading">
        <ProductBigTile
          :product="product"
          @buy-product="onBuyProductClick"
          buyVisible
          :buyLoading="cartLoading"
        />
      </section>
      <template v-if="product.features">
        <section
        v-for="feature in product.features"
        :key="feature.name"
        class="feature container card">
          <img
            class="feature__image"
            :src="product.image && require('@/assets/' + product.image)"
          />
          <div>
            <h3>{{feature.name}}</h3>
            <p>{{feature.description}}</p>
            </div>
        </section>
      </template>
      <section class="similar-products container card">
        <h3>You may also like:</h3>
        <AppLoader v-if="similarProductsLoading" />
        <p v-if="similarProductsError">Error while loading similar products</p>
        <div class="similar-products__list" v-if="similarProducts.length">
          <ProductTile
            v-for="product in similarProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </section>
      <section class="new-comment container card" v-if="product.ratingOption">
        <template v-if="!newCommentSend">
          <h3 v-html="$t('product.newComment.header', {product: product.name})" />
          <p v-if="newCommentError">{{ $t('product.newComment.error') }}</p>
          <AppRating
            :onEdit="newRate ? null : onRate"
            :rate="newRate"
            class="new-comment__app-rating"
          />
          <textarea class="new-comment__textarea" v-model="newComment" />
          <button @click="onNewCommentSend">{{ $t('commons.send') }}</button>
          <div class="new-comment__loader" v-show="newCommentLoading">
            <AppLoader />
          </div>
        </template>
        <template v-if="newCommentSend">
          <h3>{{ $t('product.newComment.thanks') }}</h3>
        </template>
      </section>
      <section class="comments container card">
        <h3>Comments:</h3>
        <h4 v-if="!product.comments.length">No comments</h4>
        <div
          class="comments__comment"
          v-for="comment in product.comments"
          :key="comment.id"
        >
          <h4>{{comment.user}}</h4>
          <p>{{comment.message}}</p>
        </div>
      </section>
    </template>
    <AppLoader v-show="loading" background />
  </div>
</template>

<script>
import AppRating from '@/components/AppRating.vue';
import AppLoader from '@/components/AppLoader.vue';
import ProductTile from '@/components/ProductTile.vue';
import ProductBigTile from '@/components/ProductBigTile.vue';
import * as actionTypes from '@/store/action-types';
import * as getterTypes from '@/store/getter-types';
import { mapGetters } from 'vuex';

export default {
  name: 'ProductPage',
  components: {
    AppRating,
    AppLoader,
    ProductTile,
    ProductBigTile,
  },
  data() {
    return {
      newRate: null,
      newComment: '',
      newCommentLoading: false,
      newCommentSend: false,
      newCommentError: false,
    };
  },
  computed: {
    ...mapGetters({
      similarProducts: getterTypes.GET_SIMILAR_PRODUCTS_LIST,
      similarProductsLoading: getterTypes.GET_SIMILAR_PRODUCTS_LOADING,
      similarProductsError: getterTypes.GET_SIMILAR_PRODUCTS_ERROR,
      cartLoading: getterTypes.GET_CART_LOADING,
    }),
    product() {
      return this.$store.getters[getterTypes.GET_PRODUCTS_BY_ID](this.$route.params.id) || {};
    },
    loading() { return !this.product.name; },
  },
  watch: {
    $route() {
      this.fetchData();
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    onRate(newRate) {
      this.newRate = newRate;
    },
    onNewCommentSend() {
      this.newCommentLoading = true;
      this.newCommentError = false;

      this.$store.dispatch(
        actionTypes.POST_RATING,
        { rating: this.newRate, comment: this.newComment },
      ).then(() => {
        this.newCommentLoading = false;
        this.newCommentSend = true;
      }).catch(() => {
        this.newCommentLoading = false;
        this.newCommentError = true;
      });
    },
    fetchData() {
      this.$store.dispatch(actionTypes.FETCH_PRODUCT, this.$route.params.id);
      this.$store.dispatch(actionTypes.FETCH_SIMILAR_PRODUCTS, this.$route.params.id);
    },
    onBuyProductClick() {
      this.$store.dispatch(actionTypes.POST_CART_PRODUCT, this.product);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
