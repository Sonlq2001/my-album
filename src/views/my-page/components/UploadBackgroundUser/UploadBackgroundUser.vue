<template>
  <div class="flex flex-col gap-3 mt-6 border-b border-[#eee] pb-2">
    <label class="font-semibold">Background</label>

    <label class="relative pt-[33%] bg-black/5 rounded-md" v-if="isEdit">
      <input hidden type="file" @change="handleChangeFile" />
      <div
        class="absolute top-0 left-0 bottom-0 right-0 bg-no-repeat bg-center bg-cover rounded-[10px]"
        v-if="imageBackground"
        :style="{
          backgroundImage: `url(${imageBackground})`,
        }"
      />

      <div
        v-else
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex justify-center items-center"
      >
        <div class="flex flex-col justify-center items-center text-text_gray">
          <i class="ri-upload-2-line text-2xl"></i>
          <span class="text-[10px]">Ảnh JPG, JPEG, PNG</span>
        </div>
      </div>
    </label>

    <div
      class="relative bg-no-repeat bg-center bg-cover pt-[33%] rounded-[10px]"
      v-else-if="imageBackground"
      :style="{
        backgroundImage: `url(${imageBackground})`,
      }"
    />

    <div v-else>Chưa có hình nền</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
});

const fileBackground = ref(null);

const imageBackground = computed(() => {
  return fileBackground.value ? URL.createObjectURL(fileBackground.value) : "";
});

const handleChangeFile = (e) => {
  fileBackground.value = e.target.files[0];
};
</script>

<style lang="css" scoped></style>
