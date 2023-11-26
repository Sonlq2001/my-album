<template>
  <div class="flex flex-col gap-3 mt-6 border-b border-[#eee] pb-2">
    <label class="font-semibold">Avatar</label>

    <label
      v-if="isEdit"
      class="w-[130px] h-[130px] rounded-full flex justify-center items-center bg-black/5"
    >
      <input hidden type="file" @change="handleChangeFile" />
      <img
        v-if="imageBackground"
        :src="imageBackground"
        alt="avatar"
        class="w-[130px] h-[130px] rounded-full"
      />

      <div v-else>
        <div class="flex flex-col justify-center items-center text-text_gray">
          <i class="ri-upload-2-line text-2xl"></i>
          <span class="text-[10px]">Ảnh JPG, JPEG, PNG</span>
        </div>
      </div>
    </label>

    <img
      v-else-if="imageBackground"
      :src="imageBackground"
      alt="avatar"
      class="w-[130px] h-[130px] rounded-full"
    />

    <div v-else>Chưa có ảnh đại diện</div>
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
