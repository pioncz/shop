<template>
  <div class="rating">
    <Star :class="classNames[0]" />
    <Star :class="classNames[1]" />
    <Star :class="classNames[2]" />
    <Star :class="classNames[3]" />
    <Star :class="classNames[4]" />
    <div class="rating__rates-number">
      ({{ratesNumber}})
    </div>
  </div>
</template>

<script>
import Star from '@/assets/star.svg';

export default {
  name: 'Rating',
  props: {
    rate: Number,
    ratesNumber: Number,
  },
  computed: {
    classNames() {
      return [
        this.rate >= 1.0 ? 'shiny' : '',
        this.rate >= 1.5 ? 'shiny' : '',
        this.rate >= 2.5 ? 'shiny' : '',
        this.rate >= 3.5 ? 'shiny' : '',
        this.rate >= 4.5 ? 'shiny' : '',
      ];
    },
  },
  components: {
    Star,
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/consts.scss';

.rating {
  display: flex;
  height: 18px;
  justify-content: flex-start;
  align-items: center;
  background: #e3e3e3;
  padding: $margin0;
  border-radius: $borderRadius;

  svg {
    height: 100%;
    width: auto;
    fill: #333;

    &.shiny {
      fill: yellow;
    }
  }

  &__rates-number {
    margin-left: $margin0;
    font-size: $font0;
    font-weight: bold;
  }
}
</style>
