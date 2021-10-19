<template>
  <div class="list-page-wrapper">
    <h1 class="center-align page_title">{{ config.name }}</h1>
    <div class="row">
      <div class="col m6 s12 switchers">
        <div class="view-modes">
          <p>Card view mode</p>
          <div class="switch">
            <label>
              Off
              <input
                type="checkbox"
                :checked="cardViewMode"
                :v-model="cardViewMode"
                @change="changeViewMode"
              />
              <span class="lever"></span>
              On
            </label>
          </div>
        </div>
        <div class="view-modes">
          <p>Use filters</p>
          <div class="switch">
            <label>
              Off
              <input
                type="checkbox"
                :checked="useFilter"
                :v-model="useFilter"
                @change="changeUseFilter"
              />
              <span class="lever"></span>
              On
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s12" v-if="useFilter">
        <form @submit.prevent="submitForm">
          <div class="col m6 s12 filter-by" id="select-wrapper">
            <label for="findby">Filter by:</label>
            <select name="findby" id="findbt" v-model="findBy">
              <option value="" disabled selected>Select filter option</option>
              <option value="title">Title</option>
              <option value="status">Status</option>
              <option value="author">Author</option>
            </select>
          </div>
          <div class="col m6 s12 filter-text">
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

    <div class="reading-list" v-if="viewMode === 'card-view'">
      <component :is="viewMode" :books="filterWithText"></component>
    </div>
    <!-- Passing additional props in case with table-view -->
    <div class="reading-list" v-else>
      <component
        :is="viewMode"
        :items="filterWithText"
        :columns="columns"
        :actions="actions"
        :config="config"
        @onEdit="handleEdit"
        @onView="handleView"
        @onDelete="handleDelete"
      ></component>
    </div>
    <floating-button icon="add" @onClick="addBookHandler" />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import TableView from "@/components/TableView.vue";
  import CardView from "@/components/books/CardView.vue";
  import FloatingButton from "@/components/FloatingButton.vue";
  import M from "materialize-css";
  import { actions, config, columns } from "@/components/books/setup.js";

  export default {
    name: "Home",
    components: {
      TableView,
      CardView,
      FloatingButton,
    },
    data() {
      return {
        description:
          "This project will help you manage your reading experience. You will never forget to read a book recommended by your friend or a book that you found on a social network using this application. It was built as a pet project with the idea of only using it in your local environment.",
        cardViewMode:
          localStorage.getItem("cardViewMode") === "card-view" || false,
        findBy: "",
        findText: "",
        viewMode: "table-view",
        useFilter: localStorage.getItem("useFilter") === "true" || false,
        actions,
        columns,
        config,
      };
    },
    computed: {
      ...mapGetters(["books"]),
      filterWithText() {
        let filter = new RegExp(this.findText, "i");
        let fieldName = this.findBy ? this.findBy : "title";
        if (fieldName === "author") {
          return this.books.filter((e) => e[fieldName].name.match(filter));
        }
        return this.books.filter((e) => e[fieldName].match(filter));
      },
    },
    methods: {
      ...mapActions({
        fetchBooks: "fetchBooks",
      }),
      submitForm(e) {
        e.preventDefault();
      },
      initForm() {
        let elems = document.querySelectorAll("select");
        M.FormSelect.init(elems);
      },
      changeViewMode() {
        this.cardViewMode = !this.cardViewMode;
        this.viewMode = this.cardViewMode ? "card-view" : "table-view";
        localStorage.setItem("cardViewMode", this.viewMode);
      },
      getViewMode() {
        this.cardViewMode =
          localStorage.getItem("cardViewMode") === "card-view" || false;
        this.viewMode = localStorage.getItem("cardViewMode") || "table-view";
      },
      changeUseFilter() {
        this.useFilter = !this.useFilter;
        localStorage.setItem("useFilter", this.useFilter);
        setTimeout(() => {
          this.initForm();
        }, 1);
      },
      getUseFilter() {
        this.useFilter = localStorage.getItem("useFilter") === "true" || false;
      },
      handleEdit({ id }) {
        this.$router.push(`/books/${id}/edit`);
      },
      handleView({ id }) {
        this.$router.push(`/books/${id}`);
      },
      handleDelete({ id }) {
        // TODO: implement.
        console.log(id);
      },
      addBookHandler() {
        this.$router.push("/books/add");
      },
    },
    mounted() {
      this.fetchBooks();
      this.initForm();
      this.getViewMode();
      this.getUseFilter();
    },
  };
</script>

<style lang="scss" scoped>
  .switchers {
    display: flex;
    align-items: flex-end;
    text-transform: uppercase;

    .view-modes {
      margin-right: 40px;
    }
  }

  .filter-text input[type="text"]:focus {
    border-bottom: 1px solid $bunting-border-color;
    box-shadow: 0 1px 0 0 $bunting-border-color;
  }

  .switch label input[type="checkbox"]:checked + .lever {
    background-color: $deep-sky-blue !important;
  }

  .switch label input[type="checkbox"]:checked + .lever::after {
    background-color: #4eabc5 !important;
  }
</style>
