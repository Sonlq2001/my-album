<template>
  <div id="default-layout">
    <Header />
    <div class="pt-[64px]">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/footer/footer.vue";
</script>

<style lang="scss" scoped></style>
