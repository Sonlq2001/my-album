<template>
  <div class="flex flex-col gap-3 mt-6 border-b border-[#eee] pb-2">
    <label class="font-semibold">Background</label>

    <div v-if="isEdit">
      <label
        class="block relative pt-[56.25%] bg-black/5 rounded-md sm:pt-[33%]"
        v-if="isEdit"
      >
        <input
          hidden
          type="file"
          name="background"
          @change="handleChangeFile"
        />
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

      <span v-if="errorMessage" class="text-sm text-red-500 inline-block mt-1">
        {{ errorMessage }}
      </span>
    </div>

    <div
      class="relative bg-no-repeat bg-center bg-cover pt-[56.25%] rounded-[10px] sm:pt-[33%]"
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
import { useField } from "vee-validate";

const { setFieldValue, background } = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  setFieldValue: {
    type: Function,
  },
  background: {
    type: String,
    default: "",
  },
});

const { errorMessage } = useField("background");
const fileBackground = ref(null);

const imageBackground = computed(() => {
  return fileBackground.value
    ? URL.createObjectURL(fileBackground.value)
    : background;
});

const handleChangeFile = (e) => {
  const file = e.target.files[0];
  if (file) {
    fileBackground.value = file;
    setFieldValue("background", file);
  }
};
</script>

<style lang="css" scoped></style>
