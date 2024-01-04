<template>
  <label v-if="label" :for="id" class="block">{{ label }}</label>
  <Field
    as="textarea"
    :id="id"
    cols="100"
    rows="5"
    :class="[
      'w-full outline-none mt-2 border-b  resize-none',
      errorMessage && meta.touched ? 'border-red-500' : 'border-[#eee]',
    ]"
    :placeholder="placeholder"
    :name="name"
  />
  <span
    v-if="errorMessage && meta.touched"
    class="block text-sm text-red-500 msg-error"
  >
    {{ errorMessage }}
  </span>
</template>

<script setup>
import { Field, useField } from "vee-validate";

const { name } = defineProps({
  id: {
    type: String,
  },
  name: {
    type: String,
    require: true,
  },
  label: {
    type: String,
  },
  placeholder: {
    type: String,
  },
});

const { errorMessage, meta } = useField(name);
</script>

<style lang="scss" scoped></style>
