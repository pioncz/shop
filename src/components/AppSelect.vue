<template>
  <div class="app-select">
    <label v-if="label">{{label}}</label>
    <select :value="value" @change="onChange">
      <option
        v-for="{label, value} in options"
        :key="label+value"
        :value="value"
      >
        {{label}}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',
  props: {
    value: String,
    label: String,
    options: Array,
  },
  methods: {
    onChange(e) {
      this.$emit('input', e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
