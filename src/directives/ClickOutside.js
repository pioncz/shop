/* eslint no-underscore-dangle: 0, no-param-reassign: 0 */
import Vue from 'vue';

// Register a global custom directive called `v-focus`
const ClickOutside = {
  // called only once, when the directive is first bound to the element.
  // This is where you can do one-time setup work.
  bind(el, binding, vnode) {
    const handler = (e) => {
      const popup = vnode.context.popupItem;

      if (
        !(popup && popup.contains(e.target))
        && !(el && el.contains(e.target))
      ) {
        binding.value(e);
      }
    };

    el.__vueClickOutside = {
      handler,
    };

    document.addEventListener('click', handler);
  },
  // When the bound element is inserted into the DOM...
  inserted(el, binding, vnode, oldVNode) {

  },
  // called after the containing component’s VNode has updated, but possibly before its children have updated.
  update() {

  },
  // called after the containing component’s VNode and the VNodes of its children have updated.
  componentUpdated() {

  },
  // called only once, when the directive is unbound from the element.
  unbind(el) {
    document.removeEventListener('click', el.__vueClickOutside.handler);
  },
};

Vue.directive('color-swatch', (el, binding) => {
  el.style.backgroundColor = binding.value;
});

export default ClickOutside;
