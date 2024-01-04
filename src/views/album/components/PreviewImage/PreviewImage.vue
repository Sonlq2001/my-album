<template>
  <div :class="['max-w-[400px] w-full', isToggleSidebar && 'active-sidebar']">
    <div class="mb-5 flex items-center justify-between">
      Tổng tấm hình ({{ linksBloBImage.length }})
      <i
        class="hidden ri-close-line cursor-pointer max-md:block"
        @click="handleClickSidebar"
      />
    </div>

    <span
      v-if="errorMessage"
      class="text-sm text-red-500 inline-block mb-3 msg-error"
    >
      {{ errorMessage }}
    </span>

    <div v-if="linksBloBImage.length > 0" class="list-image">
      <div
        v-for="(imageUpload, index) in linksBloBImage"
        :key="index"
        class="mb-4 flex items-start justify-between"
      >
        <div class="max-w-[220px] h-full max-h-[200px] overflow-hidden">
          <img
            :src="imageUpload.image"
            :alt="'upload-' + index"
            class="rounded w-full h-auto mr-4"
          />
        </div>
        <div>
          <div class="bg-gray p-2 max-w-[150px] w-full max-lg:hidden">
            <span class="text-sm text-text_gray break-all">
              {{ imageUpload.name }}
            </span>
            <span class="text-sm text-text_gray block mt-2">
              {{ imageUpload.type }}
            </span>
          </div>
          <button
            class="mt-4 flex items-center justify-center bg-main w-[20px] h-[20px] ml-auto hover:bg-sub max-lg:mt-0"
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
import { useFieldValue, useField } from "vee-validate";

const { setFieldValue } = defineProps({
  setFieldValue: {
    type: Function,
  },
  isToggleSidebar: {
    type: Boolean,
  },
});

const emits = defineEmits(["closeSidebar"]);
const { errorMessage } = useField("albums");
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

const handleClickSidebar = () => {
  emits("closeSidebar");
};
</script>

<style lang="css" scoped>
@media (max-width: 768px) {
  .preview-image {
    top: 0;
    left: -100%;
    bottom: 0;
    position: fixed;
    z-index: 100;
    background-color: #eee;
    max-width: 300px;
    padding: 20px;
    transition: ease 0.4s;
    opacity: 0;
  }
  .active-sidebar {
    left: 0;
    opacity: 1;
  }
  .list-image {
    overflow: scroll;
    height: 100%;
  }
}
</style>
