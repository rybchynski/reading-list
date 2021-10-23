<template>
  <div class="list-page-wrapper">
    <h3 class="center page_title">{{ config.name }}</h3>
    <div class="author-list">
      <table-view
        :items="authors"
        :columns="columns"
        :actions="actions"
        :config="config"
        @onEdit="handleEdit"
        @onDelete="handleDelete"
      ></table-view>
    </div>
    <floating-button icon="add" @onClick="addAuthorHandler" />
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
    }),
    computed: {
      ...mapGetters(["authors", "author"]),
    },
    methods: {
      ...mapActions({
        fetchAuthors: "fetchAuthors",
        deleteAuthor: "deleteAuthor",
        fetchAuthor: "fetchAuthor"
      }),
      handleEdit({ id }) {
        this.$router.push(`/authors/${id}/edit`);
      },
     async handleDelete({ id }) {
        await this.fetchAuthor(id)
        this.$confirm({
          title: "Warning",
          message: `Are you sure you want to delete <span class="confirm-item-name">"${this.author.name}"</span> author?`,
          confirm: "Sure",
          cancel: 'No way',
        })
          .then(res => {
            if (res) {
               this.deleteAuthor(id);
               this.fetchAuthors();
               this.$info(`Author "${this.category.name}" was deleted.`)
            }
          })
      },
      addAuthorHandler() {
        this.$router.push(`/authors/add`);
      },
    },
    mounted() {
      this.fetchAuthors();
    },
  };
</script>

