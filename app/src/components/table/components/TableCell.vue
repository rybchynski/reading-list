<template>
  <td :class="additionalClasses">
    <slot />
  </td>
</template>

<script>
  export default {
    props: {
      additionalClasses: {
        type: String,
        default: "",
      },
    },
  };
</script>
