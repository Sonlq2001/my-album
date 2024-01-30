<template>
  <div class="mt-7 columns-4 gap-5">
    <div
      class="shadow rounded-md w-full mb-5 max-w-full"
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

const props = defineProps({
  countItem: {
    type: Number,
    default: 8,
  },
});

const listLoadings = computed(() => {
  return Array(props.countItem).fill();
});
</script>

<style lang="css" scoped></style>
