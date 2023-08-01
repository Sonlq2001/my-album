<template>
  <main class="max-w-[1830px] mx-auto px-8 pt-10 mb-[70px]">
    <h1 class="font-bold text-2xl">Những bức ảnh về cuộc sống đời thường</h1>
    <p class="mt-3 text-[#656f79]">
      Kết quả tìm kiếm:
      <span class="font-semibold">20 tấm hình</span>
    </p>

    <div class="mt-7">
      <button
        class="font-sans text-sm border px-2 py-1 rounded border-[#ddd] bg-gray mr-3"
      >
        Mới nhất
      </button>
      <button class="font-sans text-sm border px-2 py-1 rounded border-[#ddd]">
        Cũ nhất
      </button>
    </div>

    <div class="mt-[50px] font-semibold text-lg">Những tấm hình nổi bật</div>
    <div class="mt-4 columns-4 gap-5">
      <item-album
        v-for="(item, index) in LIST_DATA"
        :key="index"
        :album="item"
      />
    </div>
  </main>
</template>

<script setup>
import { LIST_DATA } from "@/views/home/home.js";
import ItemAlbum from "@/components/ItemAlbum/ItemAlbum.vue";
</script>

<style lang="scss" scoped></style>
