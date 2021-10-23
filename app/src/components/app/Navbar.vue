<template>
  <div class="navbar">
    <nav>
      <div class="container">
        <div class="nav-wrapper">
          <div class="brand-logo right account-info hide-on-med-and-down">
            <router-link to="/profile">
              <AccountBadge
                :image="userImage"
                userName="John"
                userEmail="johndoe@example.com"
              />
            </router-link>
          </div>
          <a href="#" data-target="mobile-app" class="sidenav-trigger"
            ><i class="material-icons">menu</i></a
          >
          <ul class="left hide-on-med-and-down">
            <router-link
              to="/"
              custom
              v-slot="{ href, navigate, isActive }"
              exact
            >
              <li @click="navigate" :class="isActive ? 'active' : null">
                <a :href="href">
                  <i class="material-icons">home</i>
                </a>
              </li>
            </router-link>
            <router-link
              to="/categories"
              custom
              v-slot="{ href, navigate, isActive }"
              exact
            >
              <li @click="navigate" :class="isActive ? 'active' : null">
                <a :href="href"> Categories </a>
              </li>
            </router-link>
            <router-link
              to="/authors"
              custom
              v-slot="{ href, navigate, isActive }"
              exact
            >
              <li @click="navigate" :class="isActive ? 'active' : null">
                <a :href="href">Authors</a>
              </li>
            </router-link>
          </ul>
        </div>
      </div>
    </nav>
    <div id="mobile-app" class="sidenav">
      <div class="account-link">
        <router-link to="/profile">
          <AccountBadge
            :image="userImage"
            userName="John"
            userEmail="johndoe@example.com"
          />
        </router-link>
      </div>
      <ul>
        <router-link to="/" custom v-slot="{ href, navigate, isActive }">
          <li @click="navigate" :class="isActive ? 'active' : null">
            <a :href="href">
              <i class="material-icons">home</i>
              Home
            </a>
          </li>
        </router-link>
        <router-link
          to="/categories"
          custom
          v-slot="{ href, navigate, isActive }"
        >
          <li @click="navigate" :class="isActive ? 'active' : null">
            <a :href="href">
              <i class="material-icons">apps</i>
              Catagories
            </a>
          </li>
        </router-link>
      </ul>
      <Button
        buttonType="primary"
        buttonText="Sign Out"
        buttonIcon="chevron_right"
        buttonClassNames="rounded"
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
  }

  #mobile-app i.material-icons {
    line-height: 43px;
    margin-right: 10px;
  }
</style>
