<template>
  <router-link
    :to="to"
    class="inline-flex items-center hover:bg-black/5 px-[6px] py-[2px] rounded"
  >
    <i class="ri-arrow-left-line"></i>
    <span class="ml-1 text-sm">{{ text }}</span>
  </router-link>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: "Trở về",
  },
  to: {
    type: String,
    require: true,
  },
});
</script>

<style lang="css" scoped></style>
