<template>
  <div class="books">
    <div class="book-card-view" v-for="(book, id) in books" :key="id">
      <BookCard :book="book" />
    </div>
  </div>
</template>

<script>
  import BookCard from "@/components/books/BookCard.vue";
  import gsap from "gsap";

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
    methods: {
      staggerBooks() {
        gsap.from(".book-card-view", {
          duration: 0.4,
          opacity: 0,
          scale: 0,
          y: 200,
          ease: "power1",
          stagger: {
            each: 0.1,
            from: "random",
          },
        });
      },
    },
    mounted() {
      this.staggerBooks();
    },
  };
</script>

<style lang="scss" scoped>
  @import "materialize-css";

  .books {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }

  @media #{$medium-and-down} {
    .books {
      grid-template-columns: 1fr;
    }
  }

  .book-list-item {
    display: inline-block;
    margin-right: 10px;
  }
</style>
