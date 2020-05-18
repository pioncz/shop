<template>
  <div class="page product-page">
    <template v-if="!loading">
      <section class="product container card" v-if="!loading">
        <ProductBigTile
          :product="product"
          @buyProduct="buyProduct"
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
          <h3>What do you think about this product?</h3>
          <p v-if="newCommentError">Something went wrong, please send again.</p>
          <Rating :onEdit="newRate ? null : onRate" :rate="newRate" class="new-comment__rating" />
          <textarea class="new-comment__textarea" v-model="newComment" />
          <button @click="onNewCommentSend">Send</button>
          <div class="new-comment__loader" v-show="newCommentLoading">
            <AppLoader />
          </div>
        </template>
        <template v-if="newCommentSend">
          <h3>Thank you for your opinion :)</h3>
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
import Rating from '@/components/Rating.vue';
import AppLoader from '@/components/AppLoader.vue';
import ProductTile from '@/components/ProductTile.vue';
import ProductBigTile from '@/components/ProductBigTile.vue';
import * as actionTypes from '@/store/action-types';
import * as getterTypes from '@/store/getter-types';
import { mapGetters } from 'vuex';

export default {
  name: 'ProductPage',
  components: {
    Rating,
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
      newCommentError: true,
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
    buyProduct() {
      this.$store.dispatch(actionTypes.POST_CART_PRODUCT, this.product);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/consts.scss';

.product-page {
  > .card {
    display: flex;
    margin: $margin2 auto;
  }

  h2 {
    margin: 0 0 $margin2;
  }

  h3 {
    margin: $margin0 0 $margin1;
  }

  .feature {
    .feature__image {
      width: auto;
      height: 160px;
    }

    > div {
      text-align: left;
      padding-left: $margin1;
    }
  }

  .similar-products {
    flex-wrap: wrap;

    h3 {
      width: 100%;
      text-align: left;
    }

    .loader {
      position: static;
      transform: none;
      margin: $margin1 auto;
    }

    &__list {
      width: 100%;
      display: flex;
      justify-content: space-evenly;

      > div {
        flex: 1 0;
      }
    }
  }

  .new-comment {
    position: relative;
    flex-direction: column;
    align-items: flex-start;

    &__rating {
      height: 46px;
      padding: $margin1;
      margin-bottom: $margin1;
    }

    &__textarea {
      width: 500px;
      height: 140px;
      max-width: 100%;
    }

    &__loader {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(255,255,255,0.7);

      svg {
        width: 50%;
        height: 50%;
      }
    }
  }

  .comments {
    flex-direction: column;
    align-items: flex-start;

    &__comment {
      width: 100%;
      text-align: left;
      background: #eee;
      border-radius: 10px;
      padding: 0 $margin2;
      margin: $margin1 0;

      h4 {
        margin-bottom: 0;
      }

      p {
        margin-top: $margin1;
      }
    }
  }
}
</style>
