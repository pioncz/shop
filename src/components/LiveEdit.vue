<template>
  <component
    :is="component"
    @click="onClick"
    class="live-edit"
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
      }
    },
    onBlur() {
      this.editing = false;
    },
    onChange(e) {
      this.$emit('change', e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.live-edit {
  > * {
    margin: 0;
    padding: inherit;
    font-size: inherit;
    line-height: inherit;
  }
}
</style>
