<template>
  <div id="top-layout">
    <div class="relative min-h-[500px]">
      <div class="bg-main absolute top-0 left-0 w-full h-full overflow-hidden">
        <picture>
          <source media="(min-width: 1440px)" :srcset="backgroundImageRandom" />
          <source media="(max-width: 640px)" :srcset="backgroundImageRandom" />
          <img
            :src="backgroundImageRandom"
            alt="bg-main"
            class="min-w-[1000%] min-h-[1000%] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 object-cover scale-[0.1]"
          />
        </picture>
      </div>
      <div
        class="absolute left-0 right-0 bottom-0 top-0 max-w-[1830px] mx-auto"
      >
        <Header isHome />
        <search-top />
      </div>
    </div>
    <slot />

    <Footer />
  </div>
</template>

<script setup>
import { computed } from "vue";

import Header from "@/components/Header/Header.vue";
import SearchTop from "@/components/SearchTop/SearchTop.vue";
import Footer from "@/components/Footer/Footer.vue";
import {
  IMAGES_TOP,
  TIME_KEY,
  BACKGROUND_KEY,
  ONE_HOURS,
} from "@/constants/app.constants";

const setSessionKey = (date, image) => {
  sessionStorage.setItem(TIME_KEY, JSON.stringify(date));
  sessionStorage.setItem(BACKGROUND_KEY, JSON.stringify(image));
};

const backgroundImageRandom = computed(() => {
  const dateNow = new Date().getTime();
  const timeLock = sessionStorage.getItem(TIME_KEY);
  const background = sessionStorage.getItem(BACKGROUND_KEY);

  if (!timeLock || !background) {
    const imageSelected = IMAGES_TOP[0].image;
    setSessionKey(dateNow + ONE_HOURS, imageSelected);
    return imageSelected;
  }

  const parseTime = JSON.parse(timeLock);

  if (dateNow >= parseTime) {
    const lengthImage = IMAGES_TOP.length;
    const random = Math.floor(Math.random() * lengthImage);

    const imageSelected = IMAGES_TOP[random].image;
    setSessionKey(dateNow + ONE_HOURS, imageSelected);

    return imageSelected;
  }

  return JSON.parse(background);
});
</script>

<style lang="css" scoped>
.bg-main::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}
</style>
