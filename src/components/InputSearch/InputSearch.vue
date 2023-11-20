<template>
  <div class="flex-1 mx-10 h-full relative">
    <i
      class="ri-search-line absolute cursor-pointer text-xl top-1/2 -translate-y-1/2 left-[15px]"
    />
    <input
      type="text"
      placeholder="Tìm kiếm my album"
      class="w-full outline-none bg-gray h-full rounded-3xl pl-[50px] pr-5"
      @keypress="handleEnterSearch"
      v-model="searchStore.keyword"
    />
  </div>
</template>

<script setup>
import useEnterSearch from "@/composable/useEnterSearch";
import { useSearchStore } from "@/stores/search/search.store";

const searchStore = useSearchStore();
const handleEnterSearch = useEnterSearch();
</script>

<style lang="scss" scoped></style>
