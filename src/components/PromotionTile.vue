<template>
  <div :style="containerStyle" class="promotion-tile">
    <h3>{{ promotion.header }}</h3>
    <p>{{ promotion.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'PromotionTile',
  props: {
    promotion: Object,
  },
  computed: {
    containerStyle() {
      const {
        image, colorFrom, colorTo, color,
      } = this.promotion;
      let imageUrl;

      try {
        imageUrl = require(`@/assets/${image}`);
      } catch (e) {} // eslint-disable-line
      const overlay = `linear-gradient(to bottom, ${colorFrom}, ${colorTo})`;

      return {
        background: `${overlay}, url(${imageUrl}) center center / cover, ${color}`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
