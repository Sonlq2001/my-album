<template>
  <component :is="as" :class="buttonClass" :disabled="disabled">
    <svg
      class="animate-spin -ml-1 mr-3 h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      v-if="loading"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>

    <slot />
  </component>
</template>

<script setup>
import { computed } from "vue";
import { cva } from "class-variance-authority";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: Boolean,
  as: {
    type: [String, Object],
    default: "button",
  },
  intent: {
    type: String,
    validator: (val) =>
      ["primary", "secondary", "danger", "text"].includes(val),
    default: "secondary",
  },
  size: {
    type: String,
    validator: (val) => ["small", "medium", "large"].includes(val),
    default: "medium",
  },
});

const buttonClass = computed(() => {
  return cva("flex items-center rounded", {
    variants: {
      intent: {
        primary: "text-white bg-main hover:bg-sub",
        secondary: "bg-black/5 hover:bg-black/10 text-slate-700",
        danger: "bg-red-600 text-white hover:bg-red-500",
        text: "text-slate-700 hover:bg-black/5",
      },
      disabled: {
        true: "!bg-slate-100 !text-slate-400 cursor-not-allowed",
      },
      size: {
        small: "px-3 py-[6px] text-sm",
        medium: "px-4 py-2",
        large: "px-5 py-3",
      },
    },
  })({
    intent: props.intent,
    disabled: props.disabled,
    size: props.size,
  });
});
</script>

<style lang="css" scoped></style>
