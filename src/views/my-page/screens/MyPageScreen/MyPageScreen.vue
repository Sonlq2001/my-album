<template>
  <div
    class="pt-[50px] flex flex-col justify-start gap-3 max-sm:pt-[30px] px-6"
  >
    <component
      class="flex items-center justify-between font-semibold w-full p-2 px-3 text-text_gray text-left hover:bg-gray"
      v-for="(menu, index) in MENUS_MY_PAGE"
      :key="index"
      :to="menu.nameRouter ? { name: menu.nameRouter } : null"
      :is="menu.nameRouter ? 'router-link' : 'button'"
      @click="() => clickLogout(menu.nameRouter)"
    >
      {{ menu.label }}
      <i class="ri-arrow-right-s-line"></i>
    </component>
  </div>
</template>

<script setup>
import useLogout from "@/composable/useLogout";
import useGetUserInfo from "@/composable/useGetUserInfo";

import { MENUS_MY_PAGE } from "../../constants/my-page.constants";

const { avatar, background, name } = useGetUserInfo();
const handleLogout = useLogout();

const clickLogout = (nameRouter) => {
  if (nameRouter) return;

  handleLogout();
};
</script>

<style lang="scss" scoped></style>
