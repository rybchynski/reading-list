<template>
  <div class="login-page">
    <div class="container">
      <div class="row">
        <form class="col s12 m6 offset-m3">
          <div class="row">
            <div class="input-field col s12">
              <input id="email" type="email" class="validate" />
              <label for="email">Email</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <input id="password" type="password" class="validate" />
              <label for="password">Password</label>
            </div>
          </div>
        </form>
      </div>
      <div class="row">
        <div class="actions col s12 m6 offset-m3">
          <Button
            :class="foo"
            @click="click"
            buttonText="Login"
            :buttonType="primary"
            buttonClassNames="rounded"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Button from "@/components/ui/Button.vue";
  export default {
    components: {
      Button,
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
    }
  }
</style>
