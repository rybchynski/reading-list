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
          };
          await this.updateCategory({
            id: this.$route.params.id,
            data: updatedCategory,
          });
          this.$router.back();
        } catch (err) {
          this.error = err;
        }
      },
      async onCategoryCreate() {
        try {
          await this.createCategory({ data: this.model });
          this.$router.back();
        } catch (err) {
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
