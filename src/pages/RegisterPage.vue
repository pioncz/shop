<template>
  <div class="page register-page">
    <AppLoader background v-show="loading" />
    <div class="modal">
      <div v-show="registered">
        <h1>Thank you</h1>
        <p>Comfirmation email has been send. Please confirm email with provided link</p>
      </div>
      <form @submit.prevent="onSubmit" v-show="!registered">
        <h1 class="modal__title">Register</h1>
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
        <input
          placeholder="Repeat password"
          type="password"
          v-model="repeatPassword"
        />
        <button :disabled="disabled" type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import { postUser } from '@/utils/api';
import AppLoader from '@/components/AppLoader.vue';

export default {
  name: 'RegisterPage',
  components: {
    AppLoader,
  },
  data() {
    return {
      loading: false,
      error: null,
      email: '',
      password: '',
      repeatPassword: '',
      registered: false,
    };
  },
  computed: {
    disabled() {
      return this.loading
        || !this.email.length
        || !this.password.length
        || !this.repeatPassword.length;
    },
  },
  methods: {
    onSubmit() {
      if (this.password !== this.repeatPassword) {
        this.error = 'Password are not the same';
      } else if (this.email.length < 6) {
        this.error = 'Email must have at least 6 characters';
      } else if (this.password.length < 6) {
        this.error = 'Password must have at least 6 characters';
      } else {
        this.loading = true;
        this.error = null;
        postUser({ email: this.email, password: this.password })
          .then(() => {
            this.registered = true;
          })
          .catch(() => {
            // handle custom error or:
            this.error = 'Could not register user';
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>
