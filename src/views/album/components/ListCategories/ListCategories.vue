<template>
  <div class="mt-8 mb-5">
    <label for="">Chủ đề bức ảnh</label>
    <div
      :class="[
        'flex mt-3 gap-4 border-b flex-wrap pb-4',
        errorMessage && meta.touched ? 'border-red-500' : 'border-[#ddd]',
      ]"
    >
      <div
        :class="[
          'text-sm p-2 rounded-3xl cursor-pointer hover:bg-[#ddd] whitespace-nowrap',
          value === cate.value ? 'bg-main text-white hover:bg-sub' : 'bg-gray',
        ]"
        v-for="cate in listOptionCategories"
        :key="cate.value"
        @click="handleChooseCategory(cate)"
      >
        {{ cate.label }}
      </div>
    </div>
    <span
      v-if="errorMessage && meta.touched"
      class="text-sm text-red-500 msg-error"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useField } from "vee-validate";

import { useCategoryStore } from "@/stores/category/category.store";

const categoryStore = useCategoryStore();

const listOptionCategories = computed(() => {
  return (
    categoryStore.listCategories?.map((option) => ({
      value: option.id,
      label: option.title,
    })) || []
  );
});

const { setFieldValue } = defineProps({
  setFieldValue: {
    type: Function,
  },
});

const { errorMessage, meta, value } = useField("category");

const handleChooseCategory = (cate) => {
  setFieldValue("category", cate.value);
};
</script>

<style lang="scss" scoped></style>
