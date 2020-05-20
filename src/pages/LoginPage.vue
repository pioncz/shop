<template>
  <div class="page login-page">
    <AppLoader background v-show="loading" />
    <div class="modal">
      <form @submit.prevent="onSubmit">
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
    onSubmit() {
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
</style>
