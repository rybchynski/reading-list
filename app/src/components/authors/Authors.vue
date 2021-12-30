<template>
  <div class="list-page-wrapper" v-if="authors.length > 0">
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
        <div class="author-list">
          <table-view
            :items="filteredAuthors"
            :columns="columns"
            :actions="actions"
            :config="config"
            @onEdit="handleEdit"
            @onView="handleView"
            @onDelete="handleDelete"
          ></table-view>
        </div>
      </div>
    </div>
    <floating-button icon="add" @onClick="addAuthorHandler" />
  </div>
  <div v-else>
    <no-items names="Author" />
    <floating-button icon="add" @onClick="addAuthorHandler" />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import TableView from "@/components/TableView.vue";
  import FloatingButton from "@/components/ui/FloatingButton.vue";
  import { config, actions, columns } from "./setup.js";
  import NoItems from "@/components/app/NoItems.vue";

  export default {
    components: {
      TableView,
      FloatingButton,
      NoItems,
    },
    data: () => ({
      config,
      actions,
      columns,
      findText: "",
    }),
    computed: {
      ...mapGetters(["authors", "author"]),
      filteredAuthors() {
        let filter = new RegExp(this.findText, "i");
        return this.authors.filter((e) => e.name.match(filter));
      },
    },
    methods: {
      ...mapActions({
        fetchAuthors: "fetchAuthors",
        deleteAuthor: "deleteAuthor",
      }),
      handleEdit({ id }) {
        this.$router.push(`/authors/${id}/edit`);
      },
      handleView({ id }) {
        this.$router.push(`authors/${id}`);
      },

      async handleDelete({ id }) {
        await this.fetchAuthor(id);
        this.$confirm({
          title: "Warning",
          message: `Are you sure you want to delete <span class="confirm-item-name">"${this.author.name}"</span> author?`,
          confirm: "Sure",
          cancel: "No way",
        }).then((res) => {
          if (res) {
            this.deleteAuthor(id);
            this.fetchAuthors();
            this.$info(`Author "${this.author.name}" was deleted.`);
          }
        });
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
