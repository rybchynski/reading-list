import { validators } from "vue-form-generator";

export const schema = {
  fields: [
    {
      type: "input",
      label: "Author name",
      model: "name",
      min: 3,
      hint: "Minimum 3 characters",
      required: true,
      placeholder: "Put the author name...",
      inputType: "text",
      styleClasses: "col s12",
      validator: [validators.string, validators.required],
    },
    {
      type: "textArea",
      label: "Author's biography",
      model: "bio",
      placeholder: "Put the short author's biograpy...",
      rows: 10,
      styleClasses: "col s12",
    },
    {
      type: "input",
      label: "Link to author's info",
      model: "link",
      inputType: "text",
      placeholder: "Put the link to the author's info",
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
  bio: "",
  link: ""
};

