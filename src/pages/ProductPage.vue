<template>
  <div class="page product-page">
    <AppLoader v-show="loading" background />
    <template v-if="!loading">
      <section class="product container card" v-if="!loading">
        <div class="product__left" :style="imageStyle">
        </div>
        <div class="product__right">
          <h2>{{product.name}}</h2>
          <Rating class="product__rating" :rate="product.rate" :ratesNumber="product.ratesNumber" />
          <p>{{product.description}}</p>
          <h3>Specification:</h3>
          <ul class="product__specification">
            <li v-for="(item, key) in product.specification" :key="key">
              <b>{{key}}</b>: {{item.join ? item.join(', ') : item}}
            </li>
          </ul>
          <h3>Price:</h3>
          <p class="product__price">{{product.price}}</p>
          <button>Buy now</button>
        </div>
      </section>
      <template v-if="product.features">
        <section
        v-for="feature in product.features"
        :key="feature.name"
        class="feature container card">
          <img class="feature__image" :src="product.image && require('@/assets/' + product.image)" />
          <div>
            <h3>{{feature.name}}</h3>
            <p>{{feature.description}}</p>
            </div>
        </section>
      </template>
      <section class="similar-products container card">
        <h3>You may also like:</h3>
        <AppLoader />
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
  </div>
</template>

<script>
import Rating from '@/components/Rating.vue';
import AppLoader from '@/components/AppLoader.vue';
import * as actionTypes from '@/store/action-types';
import * as getterTypes from '@/store/getter-types';

export default {
  name: 'ProductPage',
  components: {
    Rating,
    AppLoader,
  },
  computed: {
    product() {
      return this.$store.getters[getterTypes.GET_PRODUCTS_BY_ID](this.$route.params.id) || {};
    },
    loading() { return !this.product.name; },
    imageStyle() {
      return { background: `url(${require(`@/assets/${this.product.image}`)}) center center / contain no-repeat, #eee` };
    },
  },
  beforeCreate() {
    this.$store.dispatch(actionTypes.FETCH_PRODUCT, this.$route.params.id);
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

  .product {
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
