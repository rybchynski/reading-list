<template>
  <div id="app">
    <notivuecation />
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

  .notivuecation-overlay {
    .notivuecation-content {
      h3 {
        color: grey;
        text-transform: uppercase;
        font-size: 25px;
      }
      .confirm-item-name {
        background-color: yellow;
      }
    }
    .notivuecation-buttons {
      display: flex;
      justify-content: flex-end;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        padding: 10px 20px;
        border: 2px solid $bunting-border-color;
        cursor: pointer;
        margin-bottom: 1px;
        border-radius: 20px;

        &.confirm {
          margin-right: 5px;
          background-color: $deep-sky-blue;
        }
        &.cancel {
          background-color: $coral;
        }
      }
    }
  }
  .toast-error {
    background-color: red;
  }
</style>
