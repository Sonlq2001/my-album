<template>
  <div class="flex items-center gap-3">
    <span class="text-[16px]" v-if="props.listCheckedAlbums.length">
      <span class="font-semibold">{{ props.listCheckedAlbums.length }}</span>
      album
    </span>

    <button
      class="bg-main text-sm text-white py-[5px] px-3 rounded-md"
      @click="handleRemoveAlbums"
    >
      Xóa
    </button>
  </div>
</template>

<script setup>
import { MAX_REMOVE_ALBUMS } from "../../constants/my-page.constants.js";

const props = defineProps({
  listCheckedAlbums: {
    type: Array,
    default: [String],
  },
});

const handleRemoveAlbums = () => {
  if (props.listCheckedAlbums.length > MAX_REMOVE_ALBUMS) {
    // TODO: modal
    alert(`Chỉ được xóa ${MAX_REMOVE_ALBUMS} albums cùng lúc`);
    return;
  }
};
</script>

<style lang="scss" scoped></style>
