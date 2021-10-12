<template>
  <table class="responsive-table striped">
    <thead>
      <slot name="columns">
        <tr>
          <table-header>#</table-header>
          <table-header v-for="({ name }, index) in columns" :key="index">
            {{ name }}
          </table-header>
          <table-header>Actions</table-header>
        </tr>
      </slot>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <slot :row="item">
          <table-cell>{{ index + 1 }}</table-cell>
          <table-cell
            v-for="({ key, nested, nestedKey }, cellIndex) in columns"
            :key="cellIndex"
          >
            <span :class="`book-${key}`" v-if="!nested">{{ item[key] }}</span>
            <span
              :class="`book-${key}-${nestedKey}`"
              v-else-if="nested && key === 'author'"
            >
              {{ item[key][nestedKey] }}
            </span>
            <span
              :class="`book-${key}-${nestedKey}`"
              v-else
              v-for="(i, nestedIndex) in item[key]"
              :key="nestedIndex"
            >
              {{ item[key][nestedIndex][nestedKey] }}
            </span>
          </table-cell>
          <table-cell :additionalClasses="`actions`">
            <Button
              v-for="({ className, emit, actionKey, label },
              actionIndex) in actions"
              :key="`action-${actionIndex}`"
              :class="className"
              @click="$emit(emit, { id: item[actionKey] })"
              :buttonText="label"
              buttonSize="small"
            />
          </table-cell>
        </slot>
      </tr>
      <tr v-if="withTotal">
        <table-cell>
          <span class="total">Total: {{ data.length }}</span>
        </table-cell>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import TableHeader from "./components/TableHeader.vue";
  import TableCell from "./components/TableCell.vue";
  import Button from "@/components/Button.vue";

  export default {
    components: {
      TableHeader,
      TableCell,
      Button,
    },
    props: {
      data: {
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
      withTotal: {
        type: Boolean,
        defalut: false,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .actions {
    display: flex !important;
    align-items: center;
    gap: 5px;
  }

  .book-categories-name,
  .book-author-name {
    background-color: orangered;
    padding: 5px 10px;
    font-size: 10px;
    border-radius: 20px;
    color: white;
    margin: 1px;
  }

  .book-author-name {
    background-color: grey;
  }

  .total {
    font-weight: bold;
  }
</style>
