<template>
  <router-link
    :to="{ name: 'Album', params: { album_id: '1' } }"
    class="mb-5 relative overflow-hidden box-image block"
  >
    <img :src="album.image" alt="" class="w-full h-full" />

    <div
      class="flex justify-between absolute left-0 bottom-[-50px] right-0 text-white bg-[rgba(0,0,0,0.3)] p-3 z-10"
    >
      <span class="font-san font-semibold">Biển cả và ta</span>
      <i class="ri-star-fill cursor-pointer"></i>
    </div>
  </router-link>
</template>

<script setup>
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
