<template>
  <div>
    <h2>Edit Book with id -- {{ book._id }}</h2>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    computed: { ...mapGetters(["book"]) },
    methods: {
      ...mapActions({ fetchBook: "fetchBook" }),
    },
    mounted() {
      this.fetchBook(this.$route.params.id);
    },
  };
</script>

<style lang="scss" scoped></style>
