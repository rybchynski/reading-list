<template>
  <div class="login-page">
    <div class="container">
      <div class="row">
        <FormValidator ref="loginForm">
          <form @submit.prevent="onLogin" class="col s12 m6 offset-m3">
            <div class="auth-form__errors" v-if="loginFormError">
              {{ loginFormError }}
            </div>
            <FieldValidator
              name="email"
              rules="email|required"
              mode="lazy"
              slim
              v-slot="{ errors }"
            >
              <div class="row">
                <div class="input-field col s12">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    v-model="loginForm.email"
                    :class="{ invalid: errors.length > 0 }"
                  />
                  <label for="email">Email</label>
                  <span
                    class="invalid-feedback"
                    v-for="(error, key) in errors"
                    :key="`email-${key}`"
                    v-show="errors"
                  >
                    {{ error }}
                  </span>
                </div>
              </div>
            </FieldValidator>

            <FieldValidator
              name="password"
              rules="required|min:6"
              mode="lazy"
              slim
              v-slot="{ errors }"
            >
              <div class="row">
                <div class="input-field col s12">
                  <input
                    id="password"
                    type="password"
                    :class="{ invalid: errors.length > 0 }"
                    v-model="loginForm.password"
                  />
                  <label for="password">Password</label>
                  <span
                    class="invalid-feedback"
                    v-for="(error, key) in errors"
                    :key="`email-${key}`"
                    v-show="errors"
                  >
                    {{ error }}
                  </span>
                </div>
              </div>
            </FieldValidator>
            <div class="row">
              <div class="actions col s12 m6">
                <button class="btn" type="submit">Sign in</button>
              </div>
            </div>
            <div class="row">
              <div class="actions__registration col s12 m6 offset-m3">
                Don't have an account yet?
                <router-link to="/sign-up" exact> Register now </router-link>
              </div>
            </div>
          </form>
        </FormValidator>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import {
    ValidationObserver,
    ValidationProvider,
  } from "vee-validate/dist/vee-validate.full";

  export default {
    components: {
      FormValidator: ValidationObserver,
      FieldValidator: ValidationProvider,
    },

    data() {
      return {
        loginForm: {
          email: "",
          password: "",
        },
        loginFormError: null,
      };
    },
    computed: {
      ...mapGetters(["isAuth", "user"]),
    },

    methods: {
      ...mapActions({ login: "login" }),
      async onLogin() {
        const isCorrect = await this.$refs.loginForm.validate();
        if (isCorrect) {
          try {
            await this.login(this.loginForm);
            this.$router.push("/");
            this.$info(`Welcome ${this.user.email} on the board!`);
          } catch (err) {
            this.loginFormError = err?.response?.data?.message;
          }
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .login-page {
    width: 100%;
    height: 100vh;
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),
      url("../../assets/images/login-bg1.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;

    form {
      input {
        color: $white;
      }

      span.invalid-feedback {
        color: red;
        font-size: 13px;
      }
    }

    .auth-form__errors {
      color: red;
      border: solid 1px red;
      padding: 10px;
      margin-bottom: 35px;
    }

    .actions {
      &__registration {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        color: aliceblue;
        font-size: 12px;
      }
    }
  }
</style>
