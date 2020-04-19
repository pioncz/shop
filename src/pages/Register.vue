<template>
  <div class="page register-page">
    <AppLoader background v-show="loading" />
    <div class="modal">
      <div v-show="registered">
        <h1>Thank you</h1>
        <p>Comfirmation email has been send. Please confirm email with provided link</p>
      </div>
      <form @submit.prevent="handleSubmit" v-show="!registered">
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
import AppLoader from '@/components/AppLoader';

export default {
  name: 'Register',
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
    handleSubmit() {
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
          .catch((error) => {
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
$blur: 5px;
$from: rgba(235,237,243,0.8) 0%;
$to: rgba(121,133,148,0.9) 60%;

.register-page {
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
