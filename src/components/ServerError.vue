<template>
  <div class="server-serror" @click="onClick">
    Server error. Click here to refresh.
  </div>
</template>

<script>
export default {
  name: 'Server-Error',
  props: {
    handleRefresh: Function,
  },
  components: {
  },
  methods: {
    onClick() {
      this.$emit('refresh');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/consts.scss';

.server-serror {
    background: $color4;
    border: 1px solid $color5;
    border-radius: $borderRadius;
    padding: $margin1 $margin2;
    margin: $margin3;
    font-size: $font3;
    font-weight: bold;
    text-align: center;
    color: $color6;
    cursor: pointer;
}
</style>
