<template>
  <div class="max-w-3xl mx-auto mb-10 min-h-[calc(100vh-64px-191px)]">
    <div class="relative">
      <img
        src="https://cdn.pixabay.com/photo/2023/08/11/12/54/nature-8183550_1280.jpg"
        alt="bg-wall"
        class="h-[250px] w-full"
      />
      <div class="absolute bottom-[-88px] left-[20px] text-center">
        <img
          src="https://cdn.pixabay.com/photo/2023/08/08/17/20/yosemite-8177850_640.jpg"
          alt="bg-avatar"
          class="w-[130px] h-[130px] rounded-full"
        />
        <span class="font-semibold block mt-3">Lê Quang Sơn</span>
      </div>
    </div>

    <div class="mt-[88px]">
      <div class="pt-[50px] flex flex-col justify-start gap-3">
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
    </div>
  </div>
</template>

<script setup>
import useLogout from "@/composable/useLogout";

import { MENUS_MY_PAGE } from "../../constants/my-page.constants";

const handleLogout = useLogout();

const clickLogout = (nameRouter) => {
  if (nameRouter) return;

  handleLogout();
};
</script>

<style lang="scss" scoped></style>
