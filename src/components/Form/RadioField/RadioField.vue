<template>
  <label class="block mb-2">{{ label }}</label>
  <div class="inline-flex items-center mr-4" v-for="option in options">
    <label
      class="relative flex cursor-pointer items-center rounded-full p-2"
      :for="option.value"
    >
      <Field
        :id="option.value"
        :name="name"
        type="radio"
        class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-main transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-8 before:w-8 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:text-main checked:before:bg-green-500 hover:before:opacity-10"
        :value="option.value"
      />
      <div
        class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-main opacity-0 transition-opacity peer-checked:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3.5 w-3.5"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
        </svg>
      </div>
    </label>
    <label
      class="mt-px cursor-pointer select-none font-light text-gray-700"
      :for="option.value"
      v-if="label"
    >
      {{ option.label }}
    </label>
  </div>
</template>

<script setup>
import { Field } from "vee-validate";

defineProps({
  label: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  options: {
    type: Array,
    default: [],
  },
});
</script>

<style lang="css" scoped></style>
