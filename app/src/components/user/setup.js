export const columns = [
  {
    key: "username",
    nested: false,
    name: "Username",
  },
  {
    key: "email",
    nested: false,
    name: "Email",
  },
  {
    key: "isActivated",
    nested: false,
    name: "Activated",
  },
  {
    key: "roles",
    nested: false,
    name: "Roles",
  },
];

export const actions = [];

export const config = {
  name: "Users",
  singleName: "User",
  tableDescription: "The list of registered users.",
  formDescription: "You can use this form for view/create/update a user.",
};
