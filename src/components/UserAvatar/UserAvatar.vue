<template>
  <div :class="avatarClass">
    <img v-if="isAvatar" class="rounded-full w-full h-full" :src="avatar" />
    <span class="text-white font-semibold uppercase" v-else>
      {{ firstCharacterName }}
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { cva } from "class-variance-authority";

const { avatar, size } = defineProps({
  avatar: {
    type: String,
    require: true,
  },
  size: {
    type: String,
    validator: (val) => ["small", "medium", "large"].includes(val),
    default: "medium",
  },
});

const avatarClass = computed(() => {
  return cva("rounded-full bg-main flex items-center justify-center", {
    variants: {
      size: {
        small: "w-8 h-8 text-sm",
        medium: "w-10 h-10 text-lg",
        large: "w-12 h-12 text-xl",
      },
    },
  })({
    size,
  });
});

const isAvatar = computed(() => {
  return avatar?.startsWith("http");
});

const firstCharacterName = computed(() => {
  return !isAvatar ? avatar?.split(" ").pop()[0] : "";
});
</script>

<style lang="css" scoped></style>
