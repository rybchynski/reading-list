export const columns = [
  {
    key: "name",
    nested: false,
    name: "Name",
  },
  //  {
  //    key: "bio",
  //    nested: false,
  //    name: "Biography",
  //  },
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
    className: "rounded small",
    label: "View",
    emit: "onView",
    actionKey: "_id"
  },
  {
    className: "rounded small button-danger",
    label: "Delete",
    emit: "onDelete",
    actionKey: "_id",
  },
];

export const config = {
  name: "Authors",
  singleName: "Author",
  tableDescription: "The list of existing authors.",
  formDescription: "You can use this form for create/update a author.",
};

