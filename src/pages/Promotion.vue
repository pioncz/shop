<template>
  <div>
    <h1>Promotion {{ $route.params.id }}</h1>
    <ProductTile
      v-bind:product="product"
    />
  </div>
</template>

<script>
import ProductTile from '@/components/ProductTile.vue';

export default {
  name: 'Promotion',
  components: {
    ProductTile,
  },
  data() {
    return {
      product: {
        name: 'Telefon 3000',
        image: 'phone1.jpg',
        price: '123$',
        rate: 4.1,
        ratesNumber: 10,
        shortDescription: 'Super przedmiot',
        description: 'Super przedmiot super przedmiot super przedmiot!',
        specification: {
          size: '123',
          power: '9000',
        },
      },
    };
  },
};
</script>

<style scoped>
</style>
