<template>
  <div class="login-page">
    <div class="container">
      <div class="row">
        <FormValidator ref="authForm">
          <form
            @submit.prevent="onAuth"
            class="col s12 m6 offset-m3"
            enctype="multipart/form-data"
          >
            <div class="auth-form__errors" v-if="authFormError">
              {{ authFormError }}
            </div>
            <FieldValidator
              name="username"
              rules="required|min:3"
              mode="lazy"
              slim
              v-slot="{ errors }"
            >
              <div class="row">
                <div class="input-field col s12">
                  <input
                    id="username"
                    type="text"
                    :class="{ invalid: errors.length > 0 }"
                    v-model="authForm.username"
                  />
                  <label for="username">Username</label>
                  <span
                    class="invalid-feedback"
                    v-for="(error, key) in errors"
                    :key="`username-${key}`"
                    v-show="errors"
                  >
                    {{ error }}
                  </span>
                </div>
              </div>
            </FieldValidator>

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
                    v-model="authForm.email"
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
                    v-model="authForm.password"
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

            <div class="file-field input-field">
              <div class="btn">
                <span>Logo</span>
                <input type="file" ref="fileLogo" @change="onLogoSelect" />
              </div>
              <div class="file-path-wrapper">
                <input
                  class="file-path validate"
                  type="text"
                  placeholder="Upload your logo image"
                />
              </div>
            </div>

            <div class="row">
              <div class="actions col s12 m6">
                <button class="btn" type="submit">Sign up</button>
              </div>
            </div>
            <div class="row">
              <div class="actions__registration col s12 m6 offset-m3">
                Already have an account?
                <router-link to="/login" exact> Sign in </router-link>
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
        authForm: {
          username: "",
          email: "",
          password: "",
          logo: null,
        },
        authFormError: null,
      };
    },
    computed: {
      ...mapGetters(["isAuth"]),
    },

    methods: {
      ...mapActions({ registration: "registration" }),
      async onAuth() {
        const isCorrect = await this.$refs.authForm.validate();
        if (isCorrect) {
          try {
            const formData = new FormData();
            formData.append("logo", this.authForm.logo);
            formData.append("username", this.authForm.username);
            formData.append("email", this.authForm.email);
            formData.append("password", this.authForm.password);
            await this.registration(formData);
            this.$router.push("/login");
            this.$info(
              "Please check your email inbox to complete registration process."
            );
          } catch (err) {
            this.authFormError = err.response.data.message;
          }
        }
      },

      onLogoSelect() {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        this.authForm.logo = this.$refs.fileLogo.files[0];
        if (!allowedTypes.includes(this.authForm.logo.type)) {
          this.authFormError =
            "Only images with jpeg/jpg/png extension are allowed";
        }
        if (this.authForm.logo.size > 500000) {
          this.authFormError = `Allow file with max size 500KB (current file size -- ${
            this.authForm.logo.size / 1000
          } KB )`;
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
      margin-top: 40px;
      margin-bottom: 40px;

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
