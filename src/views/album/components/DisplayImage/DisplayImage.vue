<template>
  <div class="fixed h-[100dvh] bg-black/90 z-50 inset-0">
    <button
      class="absolute right-[20px] top-[20px]"
      @click="closeDisplayImages"
    >
      <i class="ri-close-line text-3xl text-white" />
    </button>

    <div class="h-[calc(100dvh-80px)] w-full pt-[80px]">
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

const emits = defineEmits(["close-display-images"]);

const closeDisplayImages = () => {
  emits("close-display-images");
};
</script>

<style lang="css">
.display-images ol,
.display-images .carousel__viewport {
  height: 100%;
}

.display-images img {
  border: none;
}
</style>
