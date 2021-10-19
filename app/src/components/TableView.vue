<template>
  <div>
    <table-component
      :columns="columns"
      :actions="actions"
      :data="items"
      :withTotal="true"
      @onEdit="$emit('onEdit', $event)"
      @onView="$emit('onView', $event)"
      @onDelete="$emit('onDelete', $event)"
    ></table-component>
  </div>
</template>

<script>
  import TableComponent from "@/components/table/TableComponent";

  export default {
    components: {
      TableComponent,
    },
    emits: ["onEdit", "onView"],
    props: {
      items: {
        type: Array,
        default: () => [],
      },
      columns: {
        type: Array,
        default: () => [],
      },
      actions: {
        type: Array,
        default: () => [],
      },
      config: {
        type: Object,
        default: () => {},
      },
    },
  };
</script>

<style lang="scss" scoped></style>
