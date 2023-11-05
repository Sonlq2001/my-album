<template>
  <button
    :class="[
      'px-4 py-2  text-white bg-main hover:bg-sub rounded',
      disabled && 'bg-slate-300 pointer-events-none',
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="css" scoped></style>
