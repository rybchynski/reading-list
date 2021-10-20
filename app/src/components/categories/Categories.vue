<template>
  <div class="list-page-wrapper">
    <h3 class="center page_title">{{ config.name }}</h3>
    <div class="category-list">
      <table-view
        :items="categories"
        :columns="columns"
        :actions="actions"
        :config="config"
        @onEdit="handleEdit"
        @onDelete="handleDelete"
      ></table-view>
    </div>
    <floating-button icon="add" @onClick="addCategoryHandler" />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import TableView from "@/components/TableView.vue";
  import FloatingButton from "@/components/FloatingButton.vue";
  import { config, actions, columns } from "./setup.js";

  export default {
    components: {
      TableView,
      FloatingButton,
    },
    data: () => ({
      config,
      actions,
      columns,
    }),
    computed: {
      ...mapGetters(["categories", "category"]),
    },
    methods: {
      ...mapActions({
        fetchCategories: "fetchCategories",
        deleteCategory: "deleteCategory",
        fetchCategory: "fetchCategory"
      }),
      handleEdit({ id }) {
        this.$router.push(`/categories/${id}/edit`);
      },
     async handleDelete({ id }) {
        await this.fetchCategory(id)
        this.$confirm({
          title: "Warning",
          message: `Are you sure you want to delete <span class="confirm-item-name">"${this.category.name}"</span> category?`,
          confirm: "Sure",
          cancel: 'No way',
        })
          .then(res => {
            if (res) {
               this.deleteCategory(id);
               this.fetchCategories();
               // TODO: add tooltip here.
            }
          })
      },
      addCategoryHandler() {
        this.$router.push(`/categories/add`);
      },
    },
    mounted() {
      this.fetchCategories();
    },
  };
</script>
