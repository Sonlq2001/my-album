<template>
  <div class="mt-8 mb-5">
    <label for="">Chủ đề bức ảnh</label>
    <div
      :class="[
        'flex mt-3 gap-4 border-b  pb-4',
        errorMessage && meta.touched ? 'border-red-500' : 'border-[#ddd]',
      ]"
    >
      <div
        :class="[
          ' text-sm p-2 rounded-3xl cursor-pointer hover:bg-[#ddd]',
          value === cate.id ? 'bg-main text-white hover:bg-sub' : 'bg-gray',
        ]"
        v-for="cate in LIST_CATEGORY_ALBUMS"
        :key="cate.id"
        @click="handleChooseCategory(cate)"
      >
        {{ cate.label }}
      </div>
    </div>
    <span v-if="errorMessage && meta.touched" class="text-sm text-red-500">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
import { LIST_CATEGORY_ALBUMS } from "../../constants/album.constants";

const { setFieldValue } = defineProps({
  setFieldValue: {
    type: Function,
  },
});

const { errorMessage, meta, value } = useField("category");

const handleChooseCategory = (cate) => {
  setFieldValue("category", cate.id);
};
</script>

<style lang="scss" scoped></style>
