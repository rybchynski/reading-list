<template>
  <div>
    <div class="app-main-layout">
      <Navbar />

      <main class="app-content">
        <div class="container app-page">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";

export default {
  name: "main-layout",
  components: {
    Navbar,
  },
};
</script>

<style lang="scss" scoped>
.app-main-layout {
  height: 100%;
}

.app-page {
  margin-bottom: 40px;
}
</style>
