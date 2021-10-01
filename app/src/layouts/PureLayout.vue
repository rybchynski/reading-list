<template>
  <div>
    <div class="app-main-layout">
      <main class="app-content">
        <div class="app-page">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
  export default {
    name: "pure-layout",
  };
</script>

<style lang="scss" scoped></style>
