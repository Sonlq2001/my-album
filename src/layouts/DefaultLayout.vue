<template>
  <div id="default-layout">
    <Header />
    <slot />
    <footer>footer</footer>
  </div>
</template>

<script setup>
import Header from "@/components/Header/Header.vue";
</script>

<style lang="scss" scoped></style>
