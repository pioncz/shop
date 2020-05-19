<template>
  <div v-click-outside="hide">
    <div v-click-outside="hide" @click="() => !disabled && toggle()">
      <slot name="button"></slot>
    </div>
    <div v-show="opened" ref="popup">
      <slot name="popup"></slot>
    </div>
  </div>
</template>

<script>
import ClickOutside from '@/directives/ClickOutside';

export default {
  name: 'PopupButton',
  props: {
    disabled: Boolean,
  },
  data() {
    return {
      opened: false,
    };
  },
  methods: {
    toggle() {
      this.opened = !this.opened;
    },
    hide() {
      this.opened = false;
    },
  },
  mounted() {
    this.popupItem = this.$refs.popup;
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style lang="scss" scoped>

</style>
