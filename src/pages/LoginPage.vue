<template>
  <div class="page login-page">
    <AppLoader background v-show="loading" />
    <div class="modal">
      <form @submit.prevent="handleSubmit">
        <h1 class="modal__title">Log in</h1>
        <div
          class="modal__error"
          v-show="!!error"
        >
          {{error}}
        </div>
        <input
          placeholder="Email"
          v-model="email"
        />
        <input
          placeholder="Password"
          type="password"
          v-model="password"
        />
        <button :disabled="disabled" type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import AppLoader from '@/components/AppLoader.vue';
import * as actionTypes from '@/store/action-types';

export default {
  name: 'LoginPage',
  components: {
    AppLoader,
  },
  data() {
    return {
      loading: false,
      error: null,
      email: '',
      password: '',
    };
  },
  computed: {
    disabled() {
      return this.loading || !this.email.length || !this.password.length;
    },
  },
  methods: {
    handleSubmit() {
      if (this.email.length < 6) {
        this.error = 'Email must have at least 6 characters';
      } else if (this.password.length < 6) {
        this.error = 'Password must have at least 6 characters';
      } else {
        this.loading = true;
        this.error = null;
        this.$store.dispatch(actionTypes.LOGIN, { email: this.email, password: this.password })
          .then(() => {
            const nextUrl = this.$route.params.nextUrl || '/';

            this.$router.push(nextUrl);
          })
          .catch(() => {
            this.error = 'Email or password is incorrect';
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
$blur: 5px;
$from: rgba(235,237,243,0.8) 0%;
$to: rgba(121,133,148,0.9) 60%;

.login-page {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
  }

  &::before {
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    overflow: hidden;
    left: 0;
    display: block;
    background: linear-gradient(to bottom, $from, $to), url('../assets/background-auth.jpg');
    background-size: cover;
    background-position-y: center;
    transform: scale(1.15);
    z-index: -1;
    filter: blur($blur);
  }
}
</style>
