<template>
  <div>
    <h2>Books Card view</h2>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["books"]),
  },
};
</script>

<style lang="scss" scoped></style>
