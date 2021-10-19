<template>
  <form-page-wrapper :title="'Edit form'" :description="'Form description'">
    Place form here
  </form-page-wrapper>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FormPageWrapper from "@/components/form/FormPageWrapper.vue";

export default {
  components: { FormPageWrapper },
  computed: { ...mapGetters(["book"]) },
  methods: {
    ...mapActions({
      fetchBook: "fetchBook",
    }),
  },
  mounted() {
    this.fetchBook(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped></style>
