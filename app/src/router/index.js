import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { layout: "main" },
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/books/add",
    name: "AddBook",
    meta: { layout: "main" },
    component: () =>
      import(
        /* webpackChunkName: "home" */ "@/components/books/form/index.vue"
      ),
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
      import(
        /* webpackChunkName: "home" */ "@/components/books/form/index.vue"
      ),
  },
  // User routes.
  {
    path: "/profile",
    name: "Profile",
    meta: { layout: "pure" },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/user/Profile.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { layout: "pure" },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/user/Login.vue"),
  },
  /////////////////////////////////////////////////////////////////////////////

  {
    path: "/categories",
    name: "Categories",
    meta: { layout: "main" },
    component: () =>
      import(
        /* webpackChunkName: "home" */ "@/components/categories/Categories.vue"
      ),
  },
  {
    path: "/categories/:id/edit",
    name: "EditCategory",
    meta: { layout: "main" },
    component: () =>
      import(
        /* webpackChunkName: "home" */ "@/components/categories/form/index.vue"
      ),
  },
  {
    path: "/categories/add",
    name: "AddCategory",
    meta: { layout: "main" },
    component: () =>
      import(
        /* webpackChunkName: "home" */ "@/components/categories/form/index.vue"
      ),
  },
  {
    path: "/authors",
    name: "Authors",
    meta: { layout: "main" },
    component: () =>
      import(
        /* webpackChunkName: "authors" */ "@/components/authors/Authors.vue"
      ),
  },
  {
    path: "/authors/add",
    name: "AddAuthor",
    meta: { layout: "main" },
    component: () =>
      import(
        /* webpackChunkName: "authors" */ "@/components/authors/form/index.vue"
      ),
  },
  {
    path: "/authors/:id/edit",
    name: "EditAuthor",
    meta: { layout: "main" },
    component: () =>
      import(
        /* webpackChunkName: "home" */ "@/components/authors/form/index.vue"
      ),
  },
  {
    path: "/authors/:id",
    name: "ViewAuthor",
    meta: { layout: "main" },
    component: () =>
      import(
        /* webpackChunkName: "home" */ "@/components/authors/ViewAuthor.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
