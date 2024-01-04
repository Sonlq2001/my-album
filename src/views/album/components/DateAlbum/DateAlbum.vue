<template>
  <div class="mt-8 mb-5">
    <label for="">Thời gian</label>
    <div class="mt-3 gap-4 border-b border-[#eee] pb-4">
      <div class="flex items-center">
        <date-field name="date" hiddenMessage />
        <time-field name="time" hiddenMessage />
      </div>
      <span
        v-if="
          (errorDate && metaDate.touched) || (errorTime && metaTime.touched)
        "
        class="block text-sm text-red-500 mt-1 msg-error"
      >
        Bạn chưa nhập thời gian !
      </span>
    </div>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";

import DateField from "@/components/Form/DateField/DateField.vue";
import TimeField from "@/components/Form/TimeField/TimeField.vue";

const { errorMessage: errorDate, meta: metaDate } = useField("date");
const { errorMessage: errorTime, meta: metaTime } = useField("time");
</script>

<style lang="scss" scoped></style>
