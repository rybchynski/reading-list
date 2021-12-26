import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

function authGuard(to, from, next) {
  if (store.getters.isAuth) {
    next({ name: "Home" });
  } else {
    next();
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      layout: "main",
      shouldBeAuth: true,
    },
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/books/add",
    name: "AddBook",
    meta: {
      layout: "main",
      shouldBeAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "AddBook" */ "@/components/books/form/index.vue"
      ),
  },
  {
    path: "/books/:id",
    name: "ViewBook",
    meta: {
      layout: "main",
      shouldBeAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "ViewBook" */ "@/components/books/ViewBook.vue"
      ),
  },
  {
    path: "/books/:id/edit",
    name: "EditBook",
    meta: {
      layout: "main",
      shouldBeAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "EditBook" */ "@/components/books/form/index.vue"
      ),
  },
  // User routes.
  {
    path: "/profile",
    name: "Profile",
    meta: {
      layout: "pure",
      shouldBeAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "Profile" */ "../views/user/Profile.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { layout: "pure" },
    beforeEnter: authGuard,
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/user/Login.vue"),
  },
  {
    path: "/sign-up",
    name: "SignUp",
    meta: { layout: "pure" },
    component: () =>
      import(/* webpackChunkName: "SignUp" */ "../views/user/SignUp.vue"),
  },
  /////////////////////////////////////////////////////////////////////////////

  {
    path: "/categories",
    name: "Categories",
    meta: {
      layout: "main",
      shouldBeAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "Categories" */ "@/components/categories/Categories.vue"
      ),
  },
  {
    path: "/categories/:id/edit",
    name: "EditCategory",
    meta: {
      layout: "main",
      shouldBeAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "EditCategory" */ "@/components/categories/form/index.vue"
      ),
  },
  {
    path: "/categories/add",
    name: "AddCategory",
    meta: {
      layout: "main",
      shouldBeAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "AddCategory" */ "@/components/categories/form/index.vue"
      ),
  },
  {
    path: "/authors",
    name: "Authors",
    meta: {
      layout: "main",
      shouldBeAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "authors" */ "@/components/authors/Authors.vue"
      ),
  },
  {
    path: "/authors/add",
    name: "AddAuthor",
    meta: {
      layout: "main",
      shouldBeAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "AddAuthor" */ "@/components/authors/form/index.vue"
      ),
  },
  {
    path: "/authors/:id/edit",
    name: "EditAuthor",
    meta: {
      layout: "main",
      shouldBeAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "EditAuthor" */ "@/components/authors/form/index.vue"
      ),
  },
  {
    path: "/authors/:id",
    name: "ViewAuthor",
    meta: {
      layout: "main",
      shouldBeAuth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "ViewAuthor" */ "@/components/authors/ViewAuthor.vue"
      ),
  },
  {
    path: "*",
    name: "NotFound",
    meta: {
      layout: "pure",
    },
    component: () =>
      import(
        /* webpackChunkName: "NotFound" */ "@/components/app/NotFound.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let { isAuth } = JSON.parse(localStorage.getItem("vuex"));
  if (to.matched.some((item) => item.meta.shouldBeAuth)) {
    if (!isAuth) {
      next({
        name: "Login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
