<template>
  <div class="app-pagination">
    <button
      v-for="page in pages"
      :key="page"
      :class="page === value ? 'active' : ''"
      @click="() => onClick(page)"
    >
      {{page}}
    </button>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',
  props: {
    value: Number,
    totalPages: Number,
  },
  computed: {
    pages() {
      return [...new Array(this.totalPages)].map((e, i) => (i + 1));
    },
  },
  methods: {
    onClick(whichPage) {
      if (whichPage !== this.value) {
        this.$emit('input', whichPage);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
