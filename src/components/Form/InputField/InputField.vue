<template>
  <label v-if="label" :for="name" class="block text-text_gray mb-2">
    {{ label }}
  </label>
  <div class="relative">
    <Field
      :type="isShowPassword ? 'text' : type"
      :name="name"
      :placeholder="placeholder"
      :class="[
        'outline-none w-full p-3',
        errorMessage && meta.touched ? 'border-red-500' : 'border-[#ddd]',
        isTypePassword ? 'pr-[46px]' : '',
        variant === DEFAULT_VARIANT_INPUT ? 'border rounded-md' : 'border-b',
        overWriteClass,
      ]"
      :id="name"
    />
    <span
      v-if="isTypePassword"
      class="h-full w-[50px] text-center absolute bottom-0 right-0 cursor-pointer flex items-center justify-center"
      @click="handleTogglePassword"
    >
      <i v-if="isShowPassword" class="ri-eye-off-line" />
      <i v-else class="ri-eye-line" />
    </span>
  </div>
  <span
    v-if="errorMessage && meta.touched"
    class="text-sm text-red-500 inline-block mt-1"
  >
    {{ errorMessage }}
  </span>
</template>

<script setup>
import { computed, ref } from "vue";
import { Field, useField } from "vee-validate";

const DEFAULT_VARIANT_INPUT = "outlined";

const { name, type } = defineProps({
  name: {
    type: String,
    require: true,
  },
  placeholder: {
    type: String,
  },
  label: {
    type: String,
  },
  row: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "text",
  },
  overWriteClass: {
    type: String,
  },
  variant: {
    type: String,
    default: DEFAULT_VARIANT_INPUT,
  },
  id: {
    type: String,
  },
});

const isShowPassword = ref(false);
const isTypePassword = computed(() => type === "password");

const { errorMessage, meta } = useField(name);

const handleTogglePassword = () => {
  isShowPassword.value = !isShowPassword.value;
};
</script>

<style lang="scss" scoped></style>
