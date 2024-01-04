<template>
  <div :id="formId">
    <slot />
  </div>
</template>

<script setup>
import { watch } from "vue";

const props = defineProps({
  isSubmitting: { type: Boolean },
  formId: { type: String },
});

watch(
  () => props.isSubmitting,
  () => {
    const formElement = document.getElementById(props.formId);
    if (!formElement) return;

    const errorElement = formElement.querySelector(".msg-error");
    if (!errorElement) return;

    errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }
);
</script>

<style lang="css" scoped></style>
