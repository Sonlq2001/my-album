<template>
  <div class="mr-10 w-[400px]">
    <div class="mb-5">Tổng tấm hình ({{ linksBloBImage.length }})</div>
    <div v-if="linksBloBImage.length > 0">
      <div
        v-for="(imageUpload, index) in linksBloBImage"
        :key="index"
        class="mb-4 flex items-start"
      >
        <img
          :src="imageUpload.image"
          :alt="'upload-' + index"
          class="max-w-[200px] w-full rounded max-h-[200px] mr-4"
        />
        <div class="w-full">
          <div class="bg-gray p-2">
            <span class="text-sm text-text_gray">
              {{ imageUpload.name }}
            </span>
            <span class="text-sm text-text_gray block mt-2">
              {{ imageUpload.type }}
            </span>
          </div>
          <button
            class="mt-4 flex items-center justify-center bg-main w-[20px] h-[20px] ml-auto hover:bg-sub"
            @click="handleRemoveImage(index)"
            type="button"
          >
            <i class="ri-close-line text-white leading-[0px]"></i>
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-text_gray">Bạn chưa chọn hình ảnh nào !</div>
  </div>
</template>

<script setup>
import { onUnmounted, computed } from "vue";
import { useFieldValue } from "vee-validate";

const { setFieldValue } = defineProps({
  setFieldValue: {
    type: Function,
  },
});

const listAlbums = useFieldValue("albums");

const linksBloBImage = computed(() =>
  (listAlbums.value ?? []).map((file) => ({
    image: URL.createObjectURL(file),
    name: file.name,
    type: file.type,
  }))
);

const handleRemoveImage = (index) => {
  URL.revokeObjectURL(linksBloBImage.value[index].image);
  setFieldValue(
    "albums",
    listAlbums.value.filter((_, idx) => idx !== index)
  );
};

onUnmounted(() => {
  if (!linksBloBImage.value.length) return;
  for (const imageUpload of linksBloBImage.value) {
    URL.revokeObjectURL(imageUpload.image);
  }
});
</script>

<style lang="scss" scoped></style>
