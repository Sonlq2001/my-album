<template>
  <div :class="avatarClass">
    <span class="text-white font-semibold uppercase">
      {{ firstCharacterName }}
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { cva } from "class-variance-authority";

const props = defineProps({
  userName: {
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
    size: props.size,
  });
});

const firstCharacterName = computed(() => {
  return props.userName?.split(" ").pop()[0];
});
</script>

<style lang="css" scoped></style>
