<template>
  <div class="mt-[60px]">
    <div class="flex items-center justify-between">
      <h3 class="font-semibold">Hình ảnh liên quan</h3>
      <router-link
        to="/"
        class="text-sm text-text_gray bg-gray px-[10px] py-[6px] rounded-3xl"
        >Xem thêm</router-link
      >
    </div>

    <div
      class="relative mt-4 columns-5 gap-5 max-h-[500px] overflow-hidden mb-[60px]"
    >
      <item-album
        v-for="(item, index) in LIST_DATA"
        :key="index"
        :album="item"
      />
      <div
        class="absolute bottom-0 left-0 right-0 text-center load-more h-[190px] z-20 flex justify-center items-end"
      />
    </div>
  </div>
</template>

<script setup>
import { LIST_DATA } from "@/views/home/home.js";
import ItemAlbum from "@/components/ItemAlbum/ItemAlbum.vue";
</script>

<style lang="css" scoped>
.load-more {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0), #fff);
}
</style>
