<template>
  <div class="app-rating" @click="onClick">
    <Star :class="classNames[0]" @mouseover="() => onMouseOver(1)" @mouseleave="onMouseLeave" />
    <Star :class="classNames[1]" @mouseover="() => onMouseOver(2)" @mouseleave="onMouseLeave"  />
    <Star :class="classNames[2]" @mouseover="() => onMouseOver(3)" @mouseleave="onMouseLeave" />
    <Star :class="classNames[3]" @mouseover="() => onMouseOver(4)" @mouseleave="onMouseLeave" />
    <Star :class="classNames[4]" @mouseover="() => onMouseOver(5)" @mouseleave="onMouseLeave" />
    <div class="app-rating__rates-number" v-if="ratesNumber">
      ({{ratesNumber}})
    </div>
  </div>
</template>

<script>
import Star from '@/assets/star.svg';

export default {
  name: 'AppRating',
  props: {
    rate: Number,
    ratesNumber: Number,
    onEdit: Function,
  },
  data() {
    return {
      hovered: null,
    };
  },
  computed: {
    classNames() {
      return [
        this.hovered >= 1 || (!this.hovered && this.rate >= 1.0) ? 'shiny' : '',
        this.hovered >= 2 || (!this.hovered && this.rate >= 1.5) ? 'shiny' : '',
        this.hovered >= 3 || (!this.hovered && this.rate >= 2.5) ? 'shiny' : '',
        this.hovered >= 4 || (!this.hovered && this.rate >= 3.5) ? 'shiny' : '',
        this.hovered >= 5 || (!this.hovered && this.rate >= 4.5) ? 'shiny' : '',
      ];
    },
  },
  components: {
    Star,
  },
  methods: {
    onClick() {
      if (this.onEdit) {
        this.onEdit(this.hovered);
      }
    },
    onMouseOver(rate) {
      if (this.onEdit) {
        this.hovered = rate;
      }
    },
    onMouseLeave() {
      if (this.onEdit) {
        this.hovered = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
