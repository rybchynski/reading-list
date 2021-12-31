<template>
  <div class="account-info">
    <div class="account-info--main grey lighten-4">
      <img :src="logo" alt="account-logo" class="col3" />
      <div class="col9 account-info--meta">
        <span class="user-name">{{ userName }}</span>
        <span class="grey-text text-darken-2">{{ userEmail }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      image: {
        type: String,
        default: "",
      },
      userName: {
        type: String,
        default: "",
      },
      userEmail: {
        type: String,
        default: "",
      },
    },
    computed: {
      logo() {
        if (this.image !== "") {
          return process.env.VUE_APP_API_BASE_URL + this.image;
        }
        return require("../assets/images/empty-logo.png");
      },
    },
  };
</script>

<style lang="scss" scoped>
  .account-info {
    height: 64px;
    display: flex;
    align-items: center;
    color: black;
    line-height: 64px;
    margin: 0;

    img {
      height: 40px;
      width: 40px;
      border: 2px white solid;
      border-radius: 5px;
    }

    .account-info--main {
      height: 80%;
      border: 2px solid $bunting-border-color;
      border-radius: 10px;
      padding: 5px 20px;
      display: flex;
      align-items: center;
    }

    .account-info--meta {
      display: flex;
      flex-direction: column;
      float: right;
      margin-left: 10px;

      span {
        line-height: 15px;
        font-size: 12px;
        font-weight: 400;
        font-family: "Montserrat", sans-serif;

        &.user-name {
          font-weight: 600;
        }
      }
    }
  }
</style>
