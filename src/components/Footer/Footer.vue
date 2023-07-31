<template>
  <footer class="border-t border-[#cccc]">
    <div class="max-w-[1830px] mx-auto px-8 pt-10">
      <router-link
        :to="{ name: 'Home' }"
        class="text-black text-xl font-semibold leading-6"
        >MyAlbum</router-link
      >
      <p class="text-sm">Lưu giữ những hình ảnh của bạn</p>
    </div>
    <div class="mt-10 py-5 bg-[#eee] flex items-center justify-center">
      <span class="text-xs mr-1">Developed by Le Quang Son</span>
      <i class="ri-heart-pulse-fill text-main text-md"></i>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped></style>
