import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { layout: "main" },
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/add",
    name: "AddBook",
    meta: { layout: "main" },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/AddBook.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { layout: "pure" },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/user/Profile.vue"),
  },
  {
    path: "/books/:id",
    name: "ViewBook",
    meta: { layout: "main" },
    component: () =>
      import(/* webpackChunkName: "home" */ "@/components/books/ViewBook.vue"),
  },
  {
    path: "/books/:id/edit",
    name: "EditBook",
    meta: { layout: "main" },
    component: () =>
      import(/* webpackChunkName: "home" */ "@/components/books/EditBook.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
