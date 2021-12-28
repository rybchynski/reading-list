import {
  registration,
  login,
  logout,
  refresh,
  getUsers,
  updateUserStatus,
} from "@/services/user.service";

const state = () => ({
  user: {},
  users: [],
  isAuth: false,
  userError: null,
});

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setUsers(state, users) {
    state.users = users;
  },
  setIsAuth(state, isAuth) {
    state.isAuth = isAuth;
  },
  updateUserStatusSuccess(state, user) {
    state.user.isActivated = user.isActivated;
  },
  setUserError(state, error) {
    state.userError = error;
  },
};

const actions = {
  async registration({ commit }, data) {
    try {
      await registration(data);
    } catch (err) {
      commit("setUserError", {
        errorType: "user registration failed",
        errorMessage: err?.response?.data?.message,
        err,
      });
      throw err;
    }
  },

  async login({ commit }, email, password) {
    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.accessToken);
      commit("setUser", response.user);
      commit("setIsAuth", true);
    } catch (err) {
      commit("setUserError", {
        errorType: "user login failed",
        errorMessage: err?.response?.data?.message,
        err,
      });
      throw err;
    }
  },

  async logout({ commit }) {
    try {
      await logout();
      localStorage.removeItem("token");
      commit("setIsAuth", false);
      commit("setUser", {});
    } catch (err) {
      commit("setUserError", {
        errorType: "user logout failed",
        errorMessage: err?.response?.data?.message,
        err,
      });
      throw err;
    }
  },

  async checkAuth({ commit }) {
    try {
      const response = await refresh();
      localStorage.setItem("token", response.accessToken);
      commit("setIsAuth", true);
      commit("setUser", response.user);
    } catch (err) {
      commit("setUserError", {
        errorType: "user check auth error",
        errorMessage: err?.response?.data?.message,
        err,
      });
      throw err;
    }
  },

  async getUsers({ commit }) {
    try {
      const response = await getUsers();
      commit("setUsers", response);
    } catch (err) {
      commit("setUserError", {
        errorType: "get users error",
        errorMessage: err?.response?.data?.message,
        err,
      });
      throw err;
    }
  },

  async updateUserStatus({ commit }, { id, data }) {
    try {
      const user = await updateUserStatus(id, data);
      commit("updateUserStatusSuccess", user);
    } catch (err) {
      commit("setUserError", {
        errorType: "update user failed",
        errorMessage: err?.response?.data?.message,
        err,
      });
    }
  },
};

const getters = {
  user: ({ user }) => user,
  users: ({ users }) => users,
  isAuth: ({ isAuth }) => isAuth,
  userError: ({ userError }) => userError,
};

export default {
  mutations,
  actions,
  getters,
  state,
};
