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
        author: "author",
        error: "authorError",
      }),
      updateAction: ({
        $route: {
          params: { id },
        },
      }) => id !== undefined,
    },

    methods: {
      ...mapActions({
        fetchAuthor: "fetchAuthor",
        updateAuthor: "updateAuthor",
        createAuthor: "createAuthor",
      }),
      setModel() {
        this.model = { ...defaultForm };
      },
      setFields({ fieldKey, values = [] }) {
        const foundField = this.schema.fields.find(
          (field) => field.model === fieldKey
        );
        foundField.values = [...values];
      },
      onFormSubmit() {
        if (this.updateAction) {
          this.onAuthorUpdate();
          return;
        }
        this.onAuthorCreate();
      },
      async onAuthorUpdate() {
        try {
          const updatedAuthor = {
            ...this.model,
          };
          await this.updateAuthor({
            id: this.$route.params.id,
            data: updatedAuthor,
          });
          this.$router.back();
          this.$info(`Author "${this.model.name}" was successfully updated.`);
        } catch (err) {
          this.error = err;
          this.$error("Something went wrong.");
        }
      },
      async onAuthorCreate() {
        try {
          await this.createAuthor({ data: this.model });
          this.$router.back();
          this.$info(`Author "${this.model.name}" was successfully created.`);
        } catch (err) {
          this.$error("Something went wrong.");
          this.error = err;
        }
      },
    },

    async mounted() {
      if (this.updateAction) {
        await this.fetchAuthor(this.$route.params.id);
        this.model = { ...this.author };
        return;
      }
      this.setModel();
    },
  };
</script>
