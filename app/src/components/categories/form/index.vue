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
        category: "category",
        error: "categoryError",
        user: "user",
      }),
      updateAction: ({
        $route: {
          params: { id },
        },
      }) => id !== undefined,
    },

    methods: {
      ...mapActions({
        fetchCategory: "fetchCategory",
        updateCategory: "updateCategory",
        createCategory: "createCategory",
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
          this.onCategoryUpdate();
          return;
        }
        this.onCategoryCreate();
      },
      async onCategoryUpdate() {
        try {
          const updatedCategory = {
            ...this.model,
            owner: this.user.id,
          };
          await this.updateCategory({
            id: this.$route.params.id,
            data: updatedCategory,
          });
          this.$router.back();
          this.$info(`Category "${this.model.name}" was successfully updated.`);
        } catch (err) {
          this.error = err;
          this.$error("Something went wrong.");
        }
      },
      async onCategoryCreate() {
        try {
          const categoryData = {
            ...this.model,
            owner: this.user.id,
          };
          await this.createCategory({ data: categoryData });
          this.$router.back();
          this.$info(`Category "${this.model.name}" was created successfully.`);
        } catch (err) {
          this.$error("Something went wrong.");
          this.error = err;
        }
      },
    },

    async mounted() {
      if (this.updateAction) {
        await this.fetchCategory(this.$route.params.id);
        this.model = { ...this.category };
        return;
      }
      this.setModel();
    },
  };
</script>
