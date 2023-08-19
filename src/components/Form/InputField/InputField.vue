<template>
  <div>
    <label v-if="label" :for="name" class="block text-text_gray mb-2">
      {{ label }}
    </label>
    <div class="relative">
      <Field
        :type="isShowPassword ? 'text' : type"
        :name="name"
        :placeholder="placeholder"
        :class="[
          'outline-none w-full border rounded-md p-3',
          errorMessage && meta.touched ? 'border-red-500' : 'border-[#ddd]',
          isTypePassword ? 'pr-[46px]' : '',
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
    <span v-if="errorMessage && meta.touched" class="text-sm text-red-500">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { Field, useField } from "vee-validate";

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
});

const isShowPassword = ref(false);
const isTypePassword = computed(() => type === "password");

const { errorMessage, meta } = useField(name);

const handleTogglePassword = () => {
  isShowPassword.value = !isShowPassword.value;
};
</script>

<style lang="scss" scoped></style>
