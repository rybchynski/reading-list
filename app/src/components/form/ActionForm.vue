<template>
  <div class="actions-form">
    <form @submit.prevent="validate">
      <vue-form-generator
        :schema="formSchema"
        :model="formModel"
        :options="formOptions"
        ref="form"
        @model-updated="onUpdate"
      ></vue-form-generator>
      <Button :disabled="!isValid" buttonText="Submit" />
    </form>
    <FloatingButton @onClick="handleCancel" icon="arrow_back" />
  </div>
</template>

<script>
  import Button from "@/components/Button.vue";
  import FloatingButton from "@/components/ui/FloatingButton.vue";
  import "vue-multiselect/dist/vue-multiselect.min.css";

  export default {
    components: {
      Button,
      FloatingButton,
    },
    data() {
      return {
        isValid: true,
      };
    },
    props: {
      formSchema: {
        type: Object,
        default: () => {},
      },
      formModel: {
        type: Object,
        default: () => {},
      },
      formOptions: {
        type: Object,
        default: () => ({
          validateAsync: true,
        }),
      },
      updateAction: {
        type: Boolean,
        default: true,
      },
    },
    methods: {
      validate() {
        if (this.checkFormValidation) {
          this.$emit("on-submit", this.formModel);
        }
      },
      onUpdate(val, field) {
        this.$emit(`on${field}Update`, val);
        this.checkFormValidation();
      },
      handleCancel() {
        this.$router.back();
      },
      async checkFormValidation() {
        const errors = await this.$refs.form.validate();
        this.isValid = errors.length === 0;
        return this.isValid;
      },
      checkFormAction() {
        this.isValid = this.updateAction;
      },
    },
    mounted() {
      this.checkFormAction();
    },
  };
</script>

<style lang="scss">
  .actions-form {
    fieldset {
      border: 0;
    }

    input {
      &:focus {
        border-bottom: 1px solid $deep-sky-blue !important;
      }
    }

    textarea {
      &:focus {
        border: 1px solid $deep-sky-blue !important;
      }
    }

    input[type="checkbox"] {
      opacity: 1 !important;
    }

    .field-checkbox {
      display: flex;
      justify-content: flex-start;
    }
  }
</style>
