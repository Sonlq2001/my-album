<template>
  <div class="flex items-center gap-3 ml-auto">
    <span class="text-[16px]" v-if="allCheckedAlbums">
      <span class="font-semibold">{{ allCheckedAlbums }}</span>
      album
    </span>

    <button
      :class="[
        ' text-sm py-[5px] px-3 rounded-md flex items-center gap-2',
        allCheckedAlbums ? 'bg-main text-white' : 'bg-slate-100 text-text_gray',
      ]"
      @click="handleRemoveAlbums"
      :disabled="Boolean(!allCheckedAlbums)"
    >
      <i class="ri-delete-bin-2-line" />
      Xóa
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useMyPageStore } from "@/stores/my-page/my-page.store";

import { MAX_REMOVE_ALBUMS } from "../../constants/my-page.constants.js";

const props = defineProps({
  listCheckedAlbums: {
    type: Array,
    default: [String],
  },
});
const myPageStore = useMyPageStore();

const allCheckedAlbums = computed(() => props.listCheckedAlbums.length);

const handleRemoveAlbums = async () => {
  if (props.listCheckedAlbums.length > MAX_REMOVE_ALBUMS) {
    // TODO: modal
    alert(`Chỉ được xóa ${MAX_REMOVE_ALBUMS} albums cùng lúc`);
    return;
  }

  const isAgree = confirm("Bạn thực sự muốn xóa albums");
  if (isAgree && props.listCheckedAlbums.length) {
    try {
      await myPageStore.deleteManyAlbums(props.listCheckedAlbums);
    } catch {
      // TODO: handle error
    }
  }
};
</script>

<style lang="scss" scoped></style>
