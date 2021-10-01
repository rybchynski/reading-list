<template>
  <div class="navbar">
    <nav>
      <div class="container">
        <div class="nav-wrapper">
          <div class="brand-logo right account-info hide-on-med-and-down">
            <router-link to="/profile">
              <AccountBadge
                :image="userImage"
                userName="Joseph"
                userEmail="jlumarlin@gmail.com"
              />
            </router-link>
          </div>
          <a href="#" data-target="mobile-app" class="sidenav-trigger"
            ><i class="material-icons">menu</i></a
          >
          <ul class="left hide-on-med-and-down">
            <li>
              <router-link to="/">
                RL
              </router-link>
            </li>
            <li>
              <router-link to="/add">
                Add Book
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div id="mobile-app" class="sidenav">
      <div class="account-link">
        <router-link to="/profile">
          <AccountBadge
            :image="userImage"
            userName="Joseph"
            userEmail="jlumarlin@gmail.com"
          />
        </router-link>
      </div>
      <ul>
        <li>
          <router-link to="/">
            <i class="material-icons">home</i>
            RL
          </router-link>
        </li>
        <li>
          <router-link to="/add">
            <i class="material-icons">book</i>
            Add Book
          </router-link>
        </li>
      </ul>
      <Button
        buttonClassName="primary"
        buttonText="Sign Out"
        buttonIcon="chevron_right"
      />
    </div>
  </div>
</template>

<script>
  import "materialize-css/dist/css/materialize.css";
  import M from "materialize-css";
  import AccountBadge from "@/components/AccountBadge.vue";
  import Button from "@/components/Button.vue";

  export default {
    name: "navbar",
    components: {
      AccountBadge,
      Button,
    },
    // TODO: replace fake data with api.
    data() {
      return {
        userImage: require("../../assets/images/empty-logo.png"),
      };
    },
    mounted() {
      M.AutoInit();
    },
  };
</script>

<style lang="scss" scoped>
  nav {
    background-color: $deep-sky-blue;
  }

  .account-link {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  button {
    width: 80%;
    margin: 20px auto auto auto;

    &:hover {
      border: solid $bunting-border-color 1px;
      padding: 11px 21px;
    }
  }

  #mobile-app i.material-icons {
    line-height: 43px;
    margin-right: 10px;
  }
</style>
