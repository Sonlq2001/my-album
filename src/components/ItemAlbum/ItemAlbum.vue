<template>
  <router-link
    :to="{
      name: NamespaceRouter.ALBUM_DETAIL,
      params: { slug: album.slug },
      query: { status: queryPrivate },
    }"
    class="mb-5 relative overflow-hidden box-image inline-block max-sm:mb-4 text-[16px]"
  >
    <div
      v-if="overlay"
      :class="`image-overlay absolute inset-0 z-[-1] bg-no-repeat bg-cover bg-center blur-sm`"
      :style="{ backgroundImage: `url('${album.albumAvatar?.imageUrl}')` }"
    />
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
import { computed } from "vue";

import { NamespaceRouter } from "@/constants/router.constants";
import { KEY_STATUS_ALBUM, STATUS_ALBUM } from "@/views/album/album";

const props = defineProps({
  album: {
    type: Object,
    require: true,
  },
  overlay: {
    type: Boolean,
    default: false,
  },
});

const queryPrivate = computed(() =>
  props.album?.status === STATUS_ALBUM[KEY_STATUS_ALBUM.private]
    ? KEY_STATUS_ALBUM.private
    : undefined
);
</script>

<style lang="css" scoped>
.box-image:hover > div {
  bottom: 0;
  transition: ease-in-out 0.2s;
}
</style>
