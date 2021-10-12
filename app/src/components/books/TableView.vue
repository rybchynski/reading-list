<template>
  <div>
    <table-component
      :columns="columns"
      :actions="actions"
      :data="books"
      :withTotal="true"
      @onEdit="handleEdit"
      @onView="handleView"
    ></table-component>
  </div>
</template>

<script>
  import TableComponent from "@/components/table/TableComponent";
  import { columns, actions, config } from "./setup";

  export default {
    components: {
      TableComponent,
    },
    props: {
      books: {
        type: Array,
        default: () => [],
      },
    },
    data: () => ({
      columns,
      actions,
      config,
    }),
    methods: {
      handleEdit({ id }) {
        this.$router.push(`/books/${id}/edit`);
      },
      handleView({ id }) {
        this.$router.push(`/books/${id}`);
      },
    },
  };
</script>

<style lang="scss" scoped></style>
