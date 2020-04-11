<template>
  <div class="page register-page">
    <div class="modal">
      <form @submit="handleSubmit">
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
export default {
  name: 'Register',
  data() {
    return {
      loading: false,
      error: null,
      email: '',
      password: '',
      repeatPassword: '',
    };
  },
  computed: {
    disabled() {
      return this.loading || !this.email.length || !this.password.length || !this.repeatPassword.length;
    },
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      if (this.password !== this.repeatPassword) {
        this.error = 'Password are not the same';
      } else {
        this.loading = true;
        this.error = 'Email or password is invalid';
        console.log(this.email);
        console.log('ho');
      }
    },
  },
};
</script>

<style scoped lang="scss">
$blur: 10px;
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
