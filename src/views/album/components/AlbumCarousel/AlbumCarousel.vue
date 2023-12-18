<template>
  <carousel
    :autoplay="autoplay"
    :items-to-show="1"
    :pause-autoplay-on-hover="true"
    :wrap-around="isLoopCarousel"
    :mouse-drag="isLoopCarousel"
    ref="myCarousel"
    :class="class"
  >
    <slide
      v-for="slideImage in listImages"
      :key="slideImage.id"
      @click="handleClickSlide"
    >
      <img
        :src="slideImage.imageUrl"
        alt="my-album"
        class="max-w-full cursor-pointer rounded border border-[#eee] max-h-full"
      />
    </slide>
  </carousel>

  <div
    class="flex items-center justify-center gap-4 mt-3"
    v-if="isLoopCarousel"
  >
    <i
      @click="handlePreviousCarousel"
      class="ri-arrow-left-circle-line text-2xl cursor-pointer hover:text-main text-text_gray"
    />
    <i
      @click="handleNextCarousel"
      class="ri-arrow-right-circle-line text-2xl cursor-pointer hover:text-main text-text_gray"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { Carousel, Slide } from "vue3-carousel";

const props = defineProps({
  listImages: {
    type: [Object],
    default: [],
  },
  class: {
    type: String,
  },
  autoplay: {
    type: [Number, String],
  },
});

const emits = defineEmits(["click-slide"]);

const isLoopCarousel = computed(() => props.listImages.length > 2);
const myCarousel = ref(null);

const handlePreviousCarousel = () => {
  if (myCarousel) {
    myCarousel._value.prev();
  }
};

const handleNextCarousel = () => {
  if (myCarousel) {
    myCarousel._value.next();
  }
};

const handleClickSlide = () => {
  emits("click-slide");
};
</script>

<style lang="css" scoped></style>
