<template>
  <div class="navbar">
    <nav>
      <div class="container">
        <div class="nav-wrapper">
          <div class="brand-logo right account-info hide-on-med-and-down">
            <div class="profile-info" v-if="isAuth">
              <router-link to="/profile">
                <AccountBadge
                  :image="user.logo"
                  :userName="user.username"
                  :userEmail="user.email"
                />
              </router-link>
              <ul>
                <li @click="logout">
                  <a href="/login">Logout</a>
                </li>
              </ul>
            </div>
            <ul v-else>
              <router-link
                to="/login"
                custom
                v-slot="{ href, navigate, isActive }"
              >
                <li @click="navigate" :class="isActive ? 'active' : null">
                  <a :href="href"> Login </a>
                </li>
              </router-link>
            </ul>
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
            <router-link
              to="/users"
              custom
              v-slot="{ href, navigate, isActive }"
              exact
              v-if="isAdmin"
            >
              <li @click="navigate" :class="isActive ? 'active' : null">
                <a :href="href">Users</a>
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
            :image="user.logo"
            :userName="user.name"
            :userEmail="user.email"
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
        <router-link
          to="/authors"
          custom
          v-slot="{ href, navigate, isActive }"
          exact
        >
          <li @click="navigate" :class="isActive ? 'active' : null">
            <a :href="href">
              <i class="material-icons">person</i>
              Authors
            </a>
          </li>
        </router-link>
        <router-link
          to="/users"
          custom
          v-slot="{ href, navigate, isActive }"
          exact
          v-if="isAdmin"
        >
          <li @click="navigate" :class="isActive ? 'active' : null">
            <a :href="href">
              <i class="material-icons">people</i>
              Users
            </a>
          </li>
        </router-link>
      </ul>
      <Button
        buttonType="primary"
        buttonText="Sign Out"
        buttonIcon="chevron_right"
        buttonClassNames="rounded"
        @click="onLogout"
      />
    </div>
  </div>
</template>

<script>
  import "materialize-css/dist/css/materialize.css";
  import M from "materialize-css";
  import AccountBadge from "@/components/AccountBadge.vue";
  import Button from "@/components/ui/Button.vue";
  import { mapGetters, mapActions } from "vuex";

  export default {
    name: "navbar",
    components: {
      AccountBadge,
      Button,
    },
    computed: {
      ...mapGetters(["user", "isAuth", "isAdmin"]),
    },
    mounted() {
      M.AutoInit();
    },
    methods: {
      ...mapActions({ logout: "logout" }),
      async onLogout() {
        await this.logout();
        this.$router.push("/login");
        this.$info("You are logged out");
      },
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

  .profile-info {
    display: flex;
  }
</style>
