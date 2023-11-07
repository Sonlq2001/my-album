<template>
  <div class="flex mr-4 relative" ref="menuRef">
    <button @click="handleClickMenu">
      <img
        src="https://cdn.pixabay.com/photo/2023/10/27/23/10/mountain-8346389_640.jpg"
        alt=""
        class="w-[40px] h-[40px] rounded-full"
      />
    </button>

    <div
      class="absolute top-[120%] right-0 w-[220px] bg-dark_menu rounded-lg p-3 transition-all flex flex-col gap-1"
      v-if="isOpenMenuHeader"
    >
      <h3 class="text-white font-semibold py-2 px-3">Lê Quang Son</h3>
      <component
        v-for="(menu, index) in MENUS_HEADER"
        :to="menu.nameRouter ? { name: menu.nameRouter } : null"
        :key="index"
        :is="menu.nameRouter ? 'router-link' : 'button'"
        class="block w-full"
        @click="() => handleLogout(menu.nameRouter)"
      >
        <div
          v-if="index === MENUS_HEADER.length - 1"
          class="border-b mt-[2px] mb-[6px] border-[#ffffff1a]"
        />
        <span
          class="text-[#eee] text-sm py-2 px-3 block hover:bg-[#30323c] rounded-lg text-left"
        >
          {{ menu.label }}
        </span>
      </component>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useRouter } from "vue-router";

import { MENUS_HEADER } from "@/constants/header.constants";

const router = useRouter();
const menuRef = ref(null);
const isOpenMenuHeader = ref(false);

onClickOutside(menuRef, () => {
  isOpenMenuHeader.value = false;
});

const handleClickMenu = () => {
  isOpenMenuHeader.value = !isOpenMenuHeader.value;
};

watch(
  () => router.currentRoute.value,
  () => {
    isOpenMenuHeader.value = false;
  }
);

const handleLogout = (nameRouter) => {
  if (nameRouter) return;

  // TODO: logout
};
</script>

<style lang="css" scoped>
.router-link-active > span {
  background: #30323c;
}
</style>
