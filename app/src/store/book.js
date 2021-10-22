import {
  getBook,
  getBooks,
  updateBook,
  createBook,
  deleteBook,
} from "@/services/book.service";

const state = () => ({
  book: {},
  books: [],
  bookError: null,
});

const mutations = {
  setBook(state, book) {
    state.book = book;
  },
  setBooks(state, books) {
    state.books = books;
  },
  setBookError(state, error) {
    state.bookError = error;
  },
  updateBookSuccess(state, book) {
    state.book = book;
  },
  createBookSuccess(state, book) {
    state.book = book;
  },
  deleteBookSuccess(state, book) {
    state.book = book;
  },
};

const actions = {
  async fetchBook({ commit }, id) {
    try {
      const book = await getBook(id);
      commit("setBook", book);
    } catch (err) {
      commit("setBookError", {
        errorType: "fetch book failed",
        err,
      });
    }
  },

  async fetchBooks({ commit }) {
    try {
      const books = await getBooks();
      commit("setBooks", books);
    } catch (err) {
      commit("setBookError", {
        errorType: "fetch books failed",
        err,
      });
    }
  },

  async updateBook({ commit }, { id, data }) {
    try {
      const book = await updateBook(id, data);
      commit("updateBookSuccess", book);
    } catch (err) {
      commit("setBookError", {
        errorType: "update book failed",
        err,
      });
    }
  },

  async createBook({ commit }, { data }) {
    try {
      const book = await createBook(data);
      commit("createBookSuccess", book);
    } catch (err) {
      commit("setBookError", {
        errorType: "create book failed",
        err,
      });
    }
  },

  async deletebook({ commit }, id) {
    try {
      const book = await deleteBook(id);
      commit("deleteBookSuccess", book);
      // TODO: add popup message here.
    } catch (err) {
      commit("setBookError", {
        errorType: "book delete failed",
        err,
      });
    }
  },
};

const getters = {
  book: ({ book }) => book,
  books: ({ books }) => books,
  bookError: ({ bookError }) => bookError,
};

export default {
  mutations,
  actions,
  getters,
  state,
};
