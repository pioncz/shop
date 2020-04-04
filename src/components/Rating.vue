<template>
<div class="rating">
  <Star :class="classNames[0]" />
  <Star :class="classNames[1]" />
  <Star :class="classNames[2]" />
  <Star :class="classNames[3]" />
  <Star :class="classNames[4]" />
</div>
</template>

<script>
import Star from '@/assets/star.svg';

export default {
  name: 'Rating',
  props: {
    score: Number,
  },
  computed: {
    classNames() {
      return [
        this.score >= 1.5 ? 'shiny' : '',
        this.score >= 1.5 ? 'shiny' : '',
        this.score >= 2.5 ? 'shiny' : '',
        this.score >= 3.5 ? 'shiny' : '',
        this.score >= 4.5 ? 'shiny' : '',
      ];
    },
  },
  components: {
    Star,
  },
};
</script>

<style lang="scss" scoped>
.rating {
  display: flex;
  height: 22px;
  justify-content: center;

  svg {
    height: 100%;
    width: auto;
    fill: #333;

    &.shiny {
      fill: yellow;
    }
  }
}
</style>
