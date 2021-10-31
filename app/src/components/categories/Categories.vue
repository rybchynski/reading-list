<template>
  <div class="list-page-wrapper">
    <h3 class="center page_title">{{ config.name }}</h3>

    <div class="row">
      <div class="col s12">
        <form @submit.prevent="submitForm">
          <div class="filter-text">
            <label for="filterText">Filter:</label>
            <input
              type="text"
              name="filterText"
              placeholder="Typing here..."
              v-model="findText"
            />
          </div>
        </form>
      </div>
    </div>

    <div class="row">
      <div class="col s12">
        <div class="category-list">
          <table-view
            :items="filteredCategories"
            :columns="columns"
            :actions="actions"
            :config="config"
            @onEdit="handleEdit"
            @onDelete="handleDelete"
          ></table-view>
        </div>
      </div>
    </div>
    <floating-button icon="add" @onClick="addCategoryHandler" />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import TableView from "@/components/TableView.vue";
  import FloatingButton from "@/components/ui/FloatingButton.vue";
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
      findText: '',
    }),
    computed: {
      ...mapGetters(["categories", "category"]),
      filteredCategories() {
        let filter = new RegExp(this.findText, "i");
        return this.categories.filter((e) => e.name.match(filter) || e.description.match(filter));
      }
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
               this.$info(`Category "${this.category.name}" was deleted.`)
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
