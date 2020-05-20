<template>
  <component
    :is="component"
    @click="onClick"
    class="live-edit"
    ref="component"

  >
    <template v-if="!editing">
      {{ value }}
    </template>
    <template v-if="editing">
      <component
        :is="inputComponent"
        :value="inputComponent === 'input' ? value : null"
        @change="onChange"
        @blur="onBlur"
        ref="input"
        :style="style"
      >{{ inputComponent === 'textarea' ? value : ''}}</component>
    </template>
  </component>
</template>

<script>
export default {
  name: 'LiveEdit',
  props: {
    editable: Boolean,
    component: String,
    value: String,
    type: {
      type: String,
      default: 'text',
    },
  },
  data() {
    return {
      editing: false,
      style: {},
    };
  },
  computed: {
    inputComponent() {
      return this.type === 'text' ? 'input' : 'textarea';
    },
  },
  methods: {
    onClick() {
      if (this.editable) {
        this.editing = true;
        const { height } = this.$refs.component.getBoundingClientRect();
        this.style = { height: `${height}px` };

        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      }
    },
    onBlur() {
      this.editing = false;
      this.style = {};
    },
    onChange(e) {
      this.$emit('change', e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
