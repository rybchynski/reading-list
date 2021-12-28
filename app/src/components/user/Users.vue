<template>
  <div class="list-page-wrapper">
    <h1 class="center-align page_title">A list of {{ config.name }}</h1>
    <table class="responsive-table striped">
      <thead>
        <slot name="columns">
          <tr>
            <table-header>#</table-header>
            <table-header v-for="({ name }, index) in columns" :key="index">
              {{ name }}
            </table-header>
            <table-header>Actions</table-header>
          </tr>
        </slot>
      </thead>
      <tbody>
        <tr
          v-for="(userItem, index) in users"
          :key="index"
          :class="userItem._id === user.id ? 'green' : null"
        >
          <slot :row="user">
            <table-cell>{{ index + 1 }}</table-cell>
            <table-cell>{{ userItem.username }}</table-cell>
            <table-cell>{{ userItem.email }}</table-cell>
            <table-cell>{{ userItem.isActivated ? "yes" : "no" }}</table-cell>
            <table-cell>
              <span
                v-for="role in userItem.roles"
                :key="role"
                class="user-role"
                >{{ role }}</span
              >
            </table-cell>
            <table-cell :additionalClasses="`actions`">
              <Button
                :key="`action-${userItem.isActivated ? 'block' : 'activate'}`"
                class="rounded small button-danger"
                @click="changeStatus(userItem._id, !userItem.isActivated)"
                :buttonText="userItem.isActivated ? 'Block' : 'Unblock'"
                buttonSize="small"
              />
            </table-cell>
          </slot>
        </tr>
        <tr
          v-if="withTotal"
          style="
            background-color: transparent;
            border-top: solid 1px rgb(178, 179, 187);
          "
          class="hide-on-med-and-down"
        >
          <table-cell>
            <span class="total">Total: {{ users.length }}</span>
          </table-cell>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import TableHeader from "@/components/table/components/TableHeader.vue";
  import TableCell from "@/components/table/components/TableCell.vue";
  import Button from "@/components/ui/Button.vue";
  import { actions, config, columns } from "@/components/user/setup.js";

  export default {
    components: {
      TableHeader,
      TableCell,
      Button,
    },
    data() {
      return {
        actions,
        config,
        columns,
        withTotal: true,
      };
    },

    computed: {
      ...mapGetters(["users", "user"]),
    },

    methods: {
      ...mapActions(["getUsers", "updateUserStatus"]),
      changeStatus(id, status) {
        this.updateUserStatus({ id: id, data: { isActivated: status } });
        this.getUsers();
      },
    },

    mounted() {
      this.getUsers();
    },
  };
</script>

<style lang="scss" scoped>
  .actions {
    display: flex !important;
    align-items: center;
    gap: 5px;
  }

  .user-role {
    background-color: grey;
    padding: 5px 10px;
    font-size: 10px;
    border-radius: 20px;
    color: white;
    margin: 1px;
  }

  .total {
    font-weight: bold;
  }

  .btn {
    width: 100px;
  }

  .green {
    color: white;
  }
</style>
