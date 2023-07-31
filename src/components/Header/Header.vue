<template>
  <header
    :class="['flex items-center py-3 h-[64px]', isHome && 'justify-between']"
  >
    <router-link
      :to="{ name: 'Home' }"
      :class="[
        'text-xl font-semibold leading-6',
        isHome ? 'text-white' : 'text-black',
      ]"
      >MyAlbum</router-link
    >

    <!-- input search -->
    <input-search v-if="!isHome" />
    <!-- end input search -->

    <div class="flex items-center">
      <button
        :class="[
          'px-3 py-2 rounded-3xl flex items-center mr-4',
          isHome
            ? 'text-white hover:bg-white_0_1'
            : 'text-black hover:bg-black_0_1',
        ]"
      >
        Login
      </button>
      <button
        class="text-white bg-main px-3 py-2 rounded-3xl flex items-center hover:bg-sub"
      >
        <img
          :src="IconUpload"
          alt="icon-upload"
          class="w-[20px] text-white invert-[1] mr-1"
        />
        Upload
      </button>
    </div>
  </header>
</template>

<script setup>
import { defineProps } from "vue";

import IconUpload from "@/assets/images/upload.svg";
import InputSearch from "./../InputSearch/InputSearch.vue";

const { isHome } = defineProps({
  isHome: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped></style>
