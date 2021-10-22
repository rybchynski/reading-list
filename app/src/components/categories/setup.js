export const columns = [
  {
    key: "name",
    nested: false,
    name: "Name",
  },
  {
    key: "description",
    nested: false,
    name: "Description",
  },
];

export const actions = [
  // available emits: onEdit, onView, onDelete.
  {
    className: "rounded small",
    label: "Edit",
    emit: "onEdit",
    actionKey: "_id",
  },
  {
    className: "rounded small button-danger",
    label: "Delete",
    emit: "onDelete",
    actionKey: "_id",
  },
];

export const config = {
  name: "Categories",
  singleName: "Category",
  tableDescription: "The list of existing categories.",
  formDescription: "You can use this form for create/update a category.",
};
