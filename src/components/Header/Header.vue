<template>
  <header class="flex items-center justify-between py-3">
    <router-link
      :to="{ name: 'Home' }"
      class="text-white text-xl font-semibold leading-6"
      >MyAlbum</router-link
    >
    <div class="flex items-center">
      <button
        class="text-white px-3 py-2 rounded-3xl flex items-center hover:bg-white_0_1 mr-4"
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
import IconUpload from "@/assets/images/upload.svg";
</script>

<style lang="scss" scoped></style>
