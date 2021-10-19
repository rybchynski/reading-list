export const columns = [
  {
    key: "title",
    nested: false,
    name: "Title",
  },
  {
    key: "status",
    nested: false,
    name: "Status",
  },
  {
    key: "type",
    nested: false,
    name: "Type",
  },
  {
    key: "author",
    nested: true,
    nestedKey: "name",
    name: "Author",
  },
];

export const actions = [
  {
    className: " rounded small",
    label: "Edit",
    // onEdit, onView, onDelete.
    emit: "onEdit",
    actionKey: "_id",
  },
  {
    className: "rounded small",
    label: "View",
    emit: "onView",
    actionKey: "_id",
  },
];

export const config = {
  name: "Books",
  singleName: "Book",
  tableDescription: "The list of existing books.",
  formDescription: "You can use this form for create/update a book.",
};
