<template>
  <div class="not-found">
    <span class="neg">ERROR 404</span>
    <p>
      The page is missing or never was written. You can wait and<br />
      see if it becomes available again, or you can restart your computer.
    </p>
    <p>
      * Send us an e-mail to notify this and try it later.<br />

      * Press CTRL+ALT+DEL to restart your computer. You will<br />
      &nbsp; lose unsaved information in any programs that are running.
    </p>
    Press any link to continue
    <div class="menu">
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <router-link :to="{ name: 'Login' }" v-if="!isAuth"> | Login</router-link>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    computed: {
      ...mapGetters(["isAuth"]),
    },
  };
</script>

<style lang="scss" scoped>
  .not-found {
    width: 100%;
    height: 100vh;
    background: #0000aa;
    color: #ffffff;
    font-family: courier;
    font-size: 12pt;
    text-align: center;
    padding: 100px;
  }

  blink {
    color: yellow;
  }

  .neg {
    background: #fff;
    color: #0000aa;
    padding: 2px 8px;
    font-weight: bold;
  }

  p {
    margin: 30px 100px;
    text-align: left;
  }

  a,
  a:hover {
    color: inherit;
    font: inherit;
  }

  .menu {
    text-align: center;
    margin-top: 50px;
  }
</style>
