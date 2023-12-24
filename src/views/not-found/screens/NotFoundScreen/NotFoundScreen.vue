<template>
  <div class="flex justify-center items-center h-[100dvh] flex-col">
    <img :src="ImageNotFound" class="w-[100px] mb-4" />
    <p class="font-semibold text-text_gray">
      Địa chỉ bạn tìm kiếm không được tìm thấy !!!
    </p>

    <app-button
      as="router-link"
      :to="{ name: NamespaceRouter.HOME }"
      class="mt-5"
      intent="primary"
    >
      Quay lại trang chủ
    </app-button>
  </div>
</template>

<script setup>
import ImageNotFound from "@/assets/images/404-error.png";
import AppButton from "@/components/AppButton/AppButton.vue";

import { NamespaceRouter } from "@/constants/router.constants";
</script>

<style lang="css" scoped></style>
