<template>
  <div class="book-view">
    <h2 class="center book-title">{{ book.title }}</h2>
    <div class="row">
      <div class="col m6 s12">
        <img :src="book.cover" :alt="book.title" />
      </div>
      <div class="col m6 s12 meta-info">
        <div class="book-author" v-if="book.author">
          <span class="label">Author:</span>
          <span class="value">{{ book.author.name }}</span>
        </div>

        <div class="book-type">
          <span class="label">Type:</span>
          <span class="value">{{ book.type }}</span>
        </div>

        <div class="book-rating">
          <span class="label">Rating:</span>
          <star-rating
            :read-only="true"
            :show-rating="false"
            :rating="book.rating"
            :star-size="20"
          />
        </div>

        <div class="book-status">
          <span class="label">Status:</span>
          <span class="value">{{ book.status }}</span>
        </div>

        <div class="book-pages">
          <span class="label">Total pages:</span>
          <span class="value">{{ book.pages }} p.</span>
        </div>

        <div class="book-notation">
          <span class="label">Has notation:</span>
          <span class="value">{{ book.notation ? "Yes" : "No" }}</span>
        </div>

        <div class="book-categories">
          <span class="label">Categories:</span>
          <span
            class="value"
            v-for="(category, id) in book.categories"
            :key="id"
            >{{ category.name }}</span
          >
        </div>
        <div class="book-actions">
          <Button @click="handleEdit" buttonText="Edit" buttonSize="medium" />
          <Button
            @click="handleDelete"
            buttonText="Delete"
            buttonSize="medium"
            buttonType="danger"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s12 additional-info">
        <ul class="collapsible" ref="collapsible">
          <li v-if="book.author.bio">
            <div class="collapsible-header">
              <i class="material-icons">person</i>Author's short biography
            </div>
            <div class="collapsible-body">
              <span>{{ book.author.bio }}</span>
            </div>
          </li>
          <li v-if="book.bookIntro">
            <div class="collapsible-header">
              <i class="material-icons">book</i>Book intro
            </div>
            <div class="collapsible-body">
              <span>{{ book.bookIntro }}</span>
            </div>
          </li>
          <li v-if="book.note">
            <div class="collapsible-header">
              <i class="material-icons">event_note</i>My note
            </div>
            <div class="collapsible-body">
              <span>{{ book.note }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <FloatingButton @onClick="handleCancel" icon="arrow_back" />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import FloatingButton from "@/components/ui/FloatingButton.vue";
  import Button from "@/components/ui/Button.vue";
  import StarRating from "vue-star-rating";
  import M from "materialize-css";

  export default {
    components: { StarRating, FloatingButton, Button },
    computed: { ...mapGetters(["book"]) },
    methods: {
      ...mapActions({ fetchBook: "fetchBook", deleteBook: "deleteBook" }),
      mInit() {
        const el = this.$refs.collapsible || null;
        if (el) {
          M.Collapsible.init(el);
        }
      },
      handleCancel() {
        this.$router.back();
      },
      handleEdit() {
        this.$router.push(`/books/${this.book._id}/edit`);
      },
      handleDelete() {
        this.$confirm({
          title: "Warning",
          message: `Are you sure you want to delete <span class="confirm-item-name">"${this.book.title}"</span> book?`,
          confirm: "Sure",
          cancel: "No way",
        }).then((res) => {
          if (res) {
            this.deleteBook(this.book._id);
            this.$router.push("/");
            this.$info(`Book "${this.book.title}" was deleted.`);
          }
        });
      },
    },

    async mounted() {
      await this.fetchBook(this.$route.params.id);
      this.mInit();
    },
  };
</script>

<style lang="scss" scoped>
  .book-view {
    .book-title {
      margin: 40px auto;
    }

    img {
      max-width: 100%;
      min-width: 100%;
      object-fit: cover;
    }

    .meta-info {
      font-size: 16px;

      div[class^="book-"] {
        margin-top: 30px;
      }

      .label {
        color: gray;
      }

      .value {
        margin-left: 20px;
        font-weight: 600;
      }

      .book-categories {
        .label {
          margin-right: 20px;
        }
        .value {
          border: solid 1px gray;
          border-radius: 15px;
          background-color: orangered;
          color: white;
          padding: 5px 10px;
          text-transform: uppercase;
          font-size: 12px;
          margin-right: 5px;
          margin-left: 0;
        }
      }
    }

    .book-rating {
      display: flex;
    }

    .vue-star-rating {
      display: inline-block;
      margin-left: 20px;
    }

    .book-actions {
      display: flex;
      gap: 10px;
    }
  }
</style>
