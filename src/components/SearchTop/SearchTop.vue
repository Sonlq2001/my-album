<template>
  <div
    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[840px] w-full text-white"
  >
    <h1 class="text-3xl font-semibold">
      Dòng thời gian của bạn qua những tấm hình
    </h1>
    <p class="mt-3">
      Cùng nhau nhìn lại và chiêm nghiệm những khoảng khắc của bạn
    </p>

    <div class="w-full flex items-center relative mt-5 line">
      <img
        :src="IconSearch"
        alt="icon-search"
        class="absolute cursor-pointer w-[20px] invert-[0.5] left-[30px]"
      />
      <input
        type="text"
        placeholder="Tìm kiếm tất cả hình ảnh của bạn"
        class="w-full p-4 pl-[90px] text-black border-none outline-none rounded-[30px]"
        @keypress="handleEnterSearch"
        v-model="searchStore.keyword"
      />
    </div>
  </div>
</template>

<script setup>
import useEnterSearch from "@/composable/useEnterSearch";
import { useSearchStore } from "@/stores/search/search.store";
import IconSearch from "@/assets/images/search.svg";

const searchStore = useSearchStore();
const handleEnterSearch = useEnterSearch();
</script>

<style lang="css" scoped>
.line::after {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 70px;
  width: 1.5px;
  height: 30px;
  background: #ccc;
}
</style>
