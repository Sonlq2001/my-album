<template>
  <div id="default-layout">
    <Header />
    <div class="pt-[64px] max-md:pt-[56px]">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer//Footer.vue";
</script>

<style lang="scss" scoped></style>
