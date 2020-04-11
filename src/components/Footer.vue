<template>
  <nav class="footer">
    <div class="container">
      footer
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" scoped>
@import '@/styles/consts.scss';

.footer {
  background: $background;
  color: $color;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 9000;
  height: 60px;
  box-sizing: border-box;

  .container {
    display: flex;
    padding: 20px;
    justify-content: flex-end;
  }

  a {
    color: $color;
    margin: 0 10px;
    text-decoration: none;
  }

  .router-link-active {
    border-bottom: 2px solid #fff;
  }
}
</style>
