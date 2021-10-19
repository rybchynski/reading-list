import { validators } from "vue-form-generator";

export const schema = {
  fields: [
    {
      type: "input",
      label: "Category name",
      model: "name",
      min: 6,
      hint: "Minimum 6 characters",
      required: true,
      placeholder: "Put the category name...",
      inputType: "text",
      styleClasses: "col s12",
      validator: validators.string,
    },
    {
      type: "textArea",
      label: "Category description",
      model: "description",
      min: 10,
      required: true,
      placeholder: "Put the category description...",
      hint: "Max 500 characters",
      rows: 10,
      styleClasses: "col s12",
    },
  ],
};

export const formOptions = {
  validateAfterLoad: true,
  validateAfterChanged: true,
  validateAsync: true,
};

export const defaultForm = {
  name: "",
  description: "",
};
