import { validators } from "vue-form-generator";

export const schema = {
    fields: [
        {
            type: "input",
            label: "Category name",
            model: "name",
            min: 3,
            hint: "Minimum 3 characters",
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
            placeholder: "Put the category description...",
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
