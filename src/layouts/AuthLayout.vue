<template>
  <div
    id="auth-layout"
    class="h-[100svh] w-full overflow-hidden relative login-screen"
  >
    <div
      class="flex flex-wrap flex-col gap-4 absolute top-0 left-0 right-0 bottom-0"
    >
      <img
        v-for="(itemImage, index) in randomListImage"
        :src="itemImage.image"
        :key="index"
        :alt="'bg-' + index"
        class="flex-1 h-full max-w-[350px] max-[1024px]:max-w-[250px]"
      />
    </div>

    <slot />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { LIST_IMAGE } from "@/views/auth/constants/auth.constants";

const randomListImage = computed(() => {
  return LIST_IMAGE.sort(() => Math.random() - 0.5); // random sort list image
});
</script>

<style lang="css" scoped></style>
