<template>
  <div class="list-page-wrapper">
    <h1 class="center-align page_title">User Info</h1>
    <div class="row">
      <div class="col s12">
        <div class="user-info row">
          <div class="user-info__image col s12 m6">
            <img class="responsive-img" :src="userImage" alt="logo" />
          </div>
          <div class="user-info__data col s12 m6">
            <div class="user-info__data-name">
              <span>Username: </span>{{ user.username }}
            </div>
            <div class="user-info__data-email">
              <span>Email: </span>{{ user.email }}
            </div>
            <div class="user-info__data-created">
              <span>Created: </span> {{ createdAt }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    computed: {
      ...mapGetters(["user"]),
      createdAt() {
        const date = new Date(this.user.createdAt);
        return (
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear() +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes()
        );
      },
    },
    data() {
      return {
        userImage: require("../../assets/images/empty-logo.png"),
      };
    },
  };
</script>

<style lang="scss" scoped>
  .user-info__image {
    margin-bottom: 20px;
  }
  .user-info__data {
    font-size: 14px;
    font-weight: 600;
    color: black;

    span {
      text-transform: uppercase;
      font-size: 12px;
      color: gray;
      margin-right: 20px;
    }

    &-email {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
</style>
