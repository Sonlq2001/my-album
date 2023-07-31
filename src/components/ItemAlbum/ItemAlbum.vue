<template>
  <div class="mb-5 relative overflow-hidden box-image">
    <img :src="album.image" alt="" class="w-full h-full" />

    <div
      class="flex justify-between absolute left-0 bottom-[-50px] right-0 text-white bg-[rgba(0,0,0,0.3)] p-3 z-10"
    >
      <span class="font-san font-semibold">Biển cả và ta</span>
      <i class="ri-star-fill cursor-pointer"></i>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const { album } = defineProps({
  album: {
    type: Object,
    require: true,
  },
});
</script>

<style lang="css" scoped>
.box-image:hover > div {
  bottom: 0;
  transition: ease-in-out 0.2s;
}
</style>
