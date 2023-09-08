<template>
  <label :for="id" v-if="label" class="block">{{ label }}</label>
  <Field
    type="time"
    :class="[
      'outline-none mr-4 border p-1 rounded ',
      errorMessage && meta.touched ? 'border-red-500' : 'border-gray',
      label && 'mt-3',
    ]"
    :name="name"
    :id="id"
  />
  <span
    v-if="errorMessage && meta.touched && !hiddenMessage"
    class="block mt-1 text-sm text-red-500"
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
  hiddenMessage: {
    type: Boolean,
    default: false,
  },
});

const { errorMessage, meta } = useField(name);
</script>

<style lang="scss" scoped></style>
