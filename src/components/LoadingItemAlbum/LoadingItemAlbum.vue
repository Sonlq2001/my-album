<template>
  <div class="mt-7 columns-4 gap-5">
    <div
      class="shadow rounded-md p-1 w-full mb-5 max-w-full"
      v-for="(_, index) in listLoadings"
      :key="index"
    >
      <div class="animate-pulse rounded-sm relative overflow-auto">
        <div
          class="bg-slate-200 w-[100%] rounded-md h-[160px] max-h-full max-sm:h-[120px]"
        />

        <div
          class="bottom-[10px] absolute gap-3 flex items-center justify-between h-[25px] left-0 right-0 mx-[10px]"
        >
          <div class="w-[50%] rounded-3xl h-full bg-slate-300" />
          <div class="w-[25px] h-[25px] rounded-3xl bg-slate-300" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const listLoadings = computed(() => {
  return Array(8).fill();
});
</script>

<style lang="css" scoped></style>
