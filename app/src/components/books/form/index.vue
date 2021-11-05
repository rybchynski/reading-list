<template>
  <form-page-wrapper
    :title="
      updateAction
        ? `Update ${config.singleName}`
        : `Create ${config.singleName}`
    "
  >
    <action-form
      :updateAction="updateAction"
      :formSchema="schema"
      :fromOptions="formOptions"
      :formModel="model"
      @on-submit="onFormSubmit"
    />
  </form-page-wrapper>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import { config } from "../setup.js";
  import { schema, defaultForm, formOptions } from "./fields.js";
  import FormPageWrapper from "@/components/form/FormPageWrapper.vue";
  import ActionForm from "@/components/form/ActionForm.vue";

  export default {
    components: {
      FormPageWrapper,
      ActionForm,
    },

    data: () => ({
      model: null,
      config,
      schema,
      formOptions,
    }),

    computed: {
      ...mapGetters({
        book: "book",
        error: "bookError",
        authors: "authors",
        categories: "categories",
      }),
      updateAction: ({
        $route: {
          params: { id },
        },
      }) => id !== undefined,
    },

    methods: {
      ...mapActions({
        fetchBook: "fetchBook",
        updateBook: "updateBook",
        createBook: "createBook",
        fetchAuthors: "fetchAuthors",
        fetchCategories: "fetchCategories",
      }),
      setModel() {
        this.model = { ...defaultForm };
      },
      // todo: move this func to the mixin.
      setFields({ fieldKey, values = [] }) {
        const foundField = this.schema.fields.find(
          (field) => field.model === fieldKey
        );
        foundField.values = [...values];
      },
      onFormSubmit() {
        if (this.updateAction) {
          this.onBookUpdate();
          return;
        }
        this.onBookCreate();
      },
      async onBookUpdate() {
        try {
          const updatedBook = {
            ...this.model,
            author: this.model.author._id,
            categories: this.model.categories.map((category) => category._id),
          };
          await this.updateBook({
            id: this.$route.params.id,
            data: updatedBook,
          });
          this.$router.back();
          this.$info(`Book "${this.model.title}" was successfully updated.`);
        } catch (err) {
          this.error = err;
          this.$error("Something went wrong.");
        }
      },
      async onBookCreate() {
        try {
          await this.createBook({ data: this.model });
          this.$router.back();
          this.$info(`Book "${this.model.title}" was created successfully.`);
        } catch (err) {
          this.$error("Something went wrong.");
          this.error = err;
        }
      },
    },

    async mounted() {
      await this.fetchAuthors();
      await this.fetchCategories();
      this.setFields({ fieldKey: "author", values: this.authors });
      this.setFields({ fieldKey: "categories", values: this.categories });
      if (this.updateAction) {
        await this.fetchBook(this.$route.params.id);
        this.model = { ...this.book };
        return;
      }
      this.setModel();
    },
  };
</script>
