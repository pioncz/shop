<template>
<div :class="{loader: true, background }">
  <svg viewBox="0 0 60 60">
    <circle cx="30" cy="30" r="20" stroke-width="2" fill="none" />
    <circle cx="30" cy="30" r="17" stroke-width="2" fill="none" />
    <circle cx="30" cy="30" r="14" stroke-width="2" fill="none" />
    <circle cx="30" cy="30" r="11" stroke-width="2" fill="none" />
    <circle cx="30" cy="30" r="8" stroke-width="1.8" fill="none" />
    <circle cx="30" cy="30" r="5" stroke-width="1.6" fill="none" />
  </svg>
</div>
</template>

<script>
export default {
  name: 'AppLoader',
  props: {
    background: Boolean,
  },
};
</script>

<style lang="scss" scoped>
  $offset1: 130;
  $offset2: 107;
  $offset3: 88;
  $offset4: 69;
  $offset5: 50;
  $offset6: 32;

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  width: 120px;
  height: 120px;

  &.background {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
  }

  svg {
    width: 100%;
    height: 100%;
  }

  circle {
    &:nth-child(1) {
      stroke-dasharray: $offset1;
      stroke-dashoffset: $offset1;
      animation: dash1 1.5s infinite;
      stroke: #eee7d8;
    }

    &:nth-child(2) {
      stroke: #785471;
      stroke-dasharray: $offset2;
      stroke-dashoffset: $offset2;
      animation: dash2 1.5s infinite;
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      stroke: #71c2cc;
      stroke-dasharray: $offset3;
      stroke-dashoffset: $offset3;
      animation: dash3 1.5s infinite;
      animation-delay: 0.4s;
    }

    &:nth-child(4) {
      stroke: #d8ebf9;
      animation-delay: 0.6s;
      stroke-dasharray: $offset4;
      stroke-dashoffset: $offset4;
      animation: dash4 1.5s infinite;
    }

    &:nth-child(5) {
      stroke: #5699d5;
      animation-delay: 0.8s;
      stroke-dasharray: $offset5;
      stroke-dashoffset: $offset5;
      animation: dash5 1.5s infinite;
    }

    &:nth-child(6) {
      stroke: #1d3f72;
      stroke-dasharray: $offset6;
      stroke-dashoffset: $offset6;
      animation: dash6 1.5s infinite;
      animation-delay: 1.0s;
    }
  }
}

@keyframes dash1 {
50% {
stroke-dashoffset: 0;
}
100% {
stroke-dashoffset: -$offset1;
}
}

@keyframes dash2 {
50% {
stroke-dashoffset: 0;
}
100% {
stroke-dashoffset: -$offset2;
}
}

@keyframes dash3 {
50% {
stroke-dashoffset: 0;
}
100% {
stroke-dashoffset: -$offset3;
}
}

@keyframes dash4 {
50% {
stroke-dashoffset: 0;
}
100% {
stroke-dashoffset: -$offset4;
}
}

@keyframes dash5 {
50% {
stroke-dashoffset: 0;
}
100% {
stroke-dashoffset: -$offset5;
}
}

@keyframes dash6 {
50% {
stroke-dashoffset: 0;
}
100% {
stroke-dashoffset: -$offset6;
}
}
</style>
