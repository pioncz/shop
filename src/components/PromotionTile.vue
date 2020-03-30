<template>
<div v-bind:style="containerStyle">
    <h3>{{ promotion.header }}</h3>
    <p>{{ promotion.description }}</p>
</div>
</template>

<script>
export default {
  name: 'PromotionTile',
  props: [
    'promotion',
  ],
  computed: {
    containerStyle: function containerStyle() {
      const {
        image, colorFrom, colorTo, color,
      } = this.promotion;
      let imageUrl;

      try {
        imageUrl = require(`@/assets/${image}`);
      } catch (e) {} // eslint-disable-line
      const overlay = `linear-gradient(to bottom, ${colorFrom}, ${colorTo})`;

      return {
        background: `${overlay}, url(${imageUrl}), ${color}`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/consts.scss';

h3 {
  margin: 0;
  color: #fff;
  font-size: 38px;
  text-decoration: underline;
  padding: $margin3 0 $margin1;
}

p {
  margin: 0;
  padding: 0 0 40px;
  color: #fff;
  font-size: 22px;
}

</style>
