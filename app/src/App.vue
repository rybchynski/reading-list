<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
  import MainLayout from "@/layouts/MainLayout";
  import PureLayout from "@/layouts/PureLayout";

  export default {
    computed: {
      layout() {
        return (this.$route.meta.layout || "main") + "-layout";
      },
    },

    components: {
      MainLayout,
      PureLayout,
    },
  };
</script>

<style lang="scss">
  @import "~materialize-css/dist/css/materialize.min.css";

  body {
    font-family: "Montserrat", sans-serif;
  }

  .list-page-wrapper {
    margin-top: 80px;
  }

  .page_title {
    text-transform: uppercase;
    font-size: 30px;
  }
</style>
