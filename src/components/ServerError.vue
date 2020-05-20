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
</style>
