<template>
  <div id="default-layout">
    <div class="border-b border-[#ccc]">
      <div class="max-w-[1830px] mx-auto px-8">
        <Header />
      </div>
    </div>
    <slot />
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/footer/footer.vue";
</script>

<style lang="scss" scoped></style>
