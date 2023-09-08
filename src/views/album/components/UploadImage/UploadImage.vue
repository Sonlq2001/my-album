<template>
  <label
    class="text-center border border-[#ccc] border-dashed py-8 cursor-pointer rounded-md block"
    for="file"
    @drop.prevent="handleDropImage"
    @dragover="handleDragoverImage"
  >
    Kéo thả hoặc chọn ảnh bất kỳ mà bạn muốn tạo album của mình.
    <span class="block text-sm text-[#aaa] mt-3"
      >Hỗ trợ các loại file JPG, JPEG, PNG,
    </span>
    <input
      type="file"
      hidden
      id="file"
      accept="image/jpeg, image/png"
      multiple
      @change="handleChangeImage"
      name="albums"
    />
  </label>
  <span v-if="errorMessage" class="text-sm text-red-500">
    {{ errorMessage }}
  </span>
</template>

<script setup>
import { useField } from "vee-validate";

const { errorMessage, value } = useField("albums");

const { setFieldValue } = defineProps({
  setFieldValue: {
    type: Function,
  },
});

const handleDropImage = (e) => {
  handleImageRender(e.dataTransfer.files);
};

const handleDragoverImage = (e) => {
  e.preventDefault();
};

const handleChangeImage = (e) => {
  handleImageRender(e.target.files);
};

const handleImageRender = (files) => {
  if (!files || !files.length) return;

  const filesUpdate =
    value.value.length > 0 ? [...value.value, ...files] : [...files];

  setFieldValue("albums", filesUpdate);
};
</script>

<style lang="scss" scoped></style>
