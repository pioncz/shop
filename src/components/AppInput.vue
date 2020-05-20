<template>
  <div class="app-input">
    <label>{{label}}</label>
    <input
      :class="{ error }"
      :value="value"
      :placeholder="placeholder"
      :type="type"
      @change="onChange"
    />
    <span class="app-input__error" v-show="error">{{error}}</span>
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  props: {
    value: [String, Number],
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text',
    },
    error: String,
  },
  methods: {
    onChange(e) {
      let { value } = e.target;

      if (this.type === 'number') {
        value = +value;
      }

      this.$emit('input', value);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
