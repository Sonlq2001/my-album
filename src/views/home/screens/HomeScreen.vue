<template>
  <div class="max-w-[1830px] px-8 mx-auto page-top mt-7">
    <!-- navigation -->
    <div class="flex items-center justify-center">
      <router-link
        class="px-3 py-2 flex items-center rounded-3xl mr-5 hover:bg-gray"
        v-for="nav in NAV_HEADER"
        :key="nav.label"
        :to="nav.path"
      >
        <i :class="['text-xl mr-[6px]', nav.icon]"></i>
        <span class="text-sm font-semibold font-sans">{{ nav.label }}</span>
      </router-link>
    </div>
    <!-- end navigation -->

    <div class="mt-7">
      <button class="font-sans text-sm border px-2 py-1 rounded border-[#ddd]">
        Mới nhất
      </button>
    </div>

    <!-- layout masonry -->
    <div class="relative">
      <div class="mt-7 columns-4 gap-5">
        <div
          v-for="(item, index) in LIST_DATA"
          :key="index"
          class="mb-5 relative overflow-hidden box-image"
        >
          <img :src="item.image" alt="" class="w-full h-full" />

          <div
            class="flex justify-between absolute left-0 bottom-[-50px] right-0 text-white bg-[rgba(0,0,0,0.3)] p-3 z-10"
          >
            <span class="font-san font-semibold">Biển cả và ta</span>
            <i class="ri-star-fill cursor-pointer"></i>
          </div>
        </div>
      </div>

      <div
        class="absolute bottom-0 left-0 right-0 text-center load-more h-[190px] z-20 flex justify-center items-end"
      >
        <button
          class="border border-[#bbb] rounded-2xl px-3 py-1 text-md inline-block mb-7 hover:bg-gray"
        >
          Xem thêm
        </button>
      </div>
    </div>
    <div class="mt-[100px]" />
    <!-- end layout masonry -->

    <box-message></box-message>
  </div>
</template>

<script setup>
import { NAV_HEADER } from "@/constants/NavHeader.constants.js";
import { LIST_DATA } from "../constants/home.constants";

import BoxMessage from "../components/BoxMessage/BoxMessage.vue";
</script>

<style lang="css" scoped>
.router-link-active {
  background-color: #f7f7f7;
}
.router-link-active > i {
  color: #00ab6b;
}
.load-more {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0), #fff);
}
.box-image:hover > div {
  bottom: 0;
  transition: ease-in-out 0.2s;
}
</style>
