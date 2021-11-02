<template>
  <div>
    <div class="books">
      <div class="book-card-view" v-for="(book, id) in books" :key="id">
        <BookCard :book="book" />
      </div>
    </div>
  </div>
</template>

<script>
  import BookCard from "@/components/books/BookCard.vue";

  export default {
    components: {
      BookCard,
    },
    props: {
      books: {
        type: Array,
        defalut: () => [],
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "materialize-css";

  .books {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    // grid-template-rows: repeat(4, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }

  @media #{$medium-and-down} {
    .books {
      grid-template-columns: 1fr;
    }
  }
</style>
