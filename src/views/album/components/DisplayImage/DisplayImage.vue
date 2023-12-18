<template>
  <div class="fixed h-[100vh] bg-black/90 z-50 inset-0">
    <div class="h-[calc(100vh-60px)] w-full py-[48px]">
      <album-carousel
        :list-images="albumDetail"
        class="display-images h-full"
      />
    </div>
  </div>
</template>

<script setup>
import AlbumCarousel from "../../components/AlbumCarousel/AlbumCarousel.vue";

defineProps({
  albumDetail: {
    type: Object,
    require: true,
    default: [],
  },
});
</script>

<style lang="css">
.display-images ol,
.display-images .carousel__viewport {
  height: 100%;
}
</style>
