<template>
  <div class="page contact-page">
    <h1>Contact</h1>
    <div class="contact-card">
      <div class="contact-card__left">
        <p>Email:</p>
        <p>super_email@not_gmail.com</p>
        <p>Phone:</p>
        <p>333 222 111</p>
        <p>Address:</p>
        <p>Imaginary street 100</p>
      </div>
      <div class="contact-card__right">
        Map or cool marketing picture
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
};
</script>

<style scoped lang="scss">
@import '@/styles/consts.scss';

.contact-page {
  padding: 0 $margin4;
}

.contact-card {
  display: flex;
  border: 1px solid $background;
  border-radius: $borderRadius;

  &__left {
    flex: 1 1 50%;
    width: 50%;
    border-right: 1px solid $background;
    margin: $margin2 0 $margin2 $margin2;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    padding: 0 $margin4 0 $margin2;

    > p {
      flex: 1 1 50%;
      width: 50%;
      text-align: left;
      font-weight: bold;
    }

    > p:nth-child(2n) {
      text-align: right;
      font-weight: normal;
    }
  }

  &__right {
    margin: $margin2;
    flex: 1 1 50%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ccc;
  }
}
</style>
