<template>
<div :class="{
  'app-loader': true,
  'app-loader--background': background,
  'app-loader--small': small,
}">
  <svg viewBox="0 0 60 60">
    <circle cx="30" cy="30" r="20" :stroke-width="small ? 8 : 2" fill="none" />
    <circle v-if="!small" cx="30" cy="30" r="17" stroke-width="2" fill="none" />
    <circle v-if="!small" cx="30" cy="30" r="14" stroke-width="2" fill="none" />
    <circle v-if="!small" cx="30" cy="30" r="11" stroke-width="2" fill="none" />
    <circle v-if="!small" cx="30" cy="30" r="8" stroke-width="1.8" fill="none" />
    <circle v-if="!small" cx="30" cy="30" r="5" stroke-width="1.6" fill="none" />
  </svg>
</div>
</template>

<script>
export default {
  name: 'AppLoader',
  props: {
    background: Boolean,
    small: Boolean,
  },
};
</script>

<style lang="scss" scoped>
</style>
