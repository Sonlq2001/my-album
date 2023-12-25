<template>
  <router-link
    :to="{
      name: NamespaceRouter.ALBUM_DETAIL,
      params: { slug: album.slug },
    }"
    class="mb-5 relative overflow-hidden box-image inline-block max-sm:mb-4 text-[16px]"
  >
    <img
      :src="album.albumAvatar?.imageUrl"
      alt=""
      class="w-full h-full max-h-full max-w-full"
    />

    <div
      class="flex justify-between absolute left-0 bottom-[-50px] right-0 text-white bg-[rgba(0,0,0,0.3)] p-3 z-10"
    >
      <span class="font-san font-semibold truncate pr-4">
        {{ album.title }}
      </span>
      <i class="ri-star-fill cursor-pointer"></i>
    </div>
  </router-link>
</template>

<script setup>
import { NamespaceRouter } from "@/constants/router.constants";

defineProps({
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
