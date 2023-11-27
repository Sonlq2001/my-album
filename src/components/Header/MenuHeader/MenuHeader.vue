<template>
  <div class="flex mr-4 relative" ref="menuRef">
    <button @click="handleClickMenu">
      <user-avatar :user-name="authStore.authData?.name" />
    </button>

    <div
      class="absolute top-[120%] right-0 w-[220px] bg-dark_menu rounded-lg p-3 transition-all flex flex-col gap-1"
      v-if="isOpenMenuHeader"
    >
      <h3 class="text-white font-semibold py-2 px-3">
        {{ authStore.authData?.name }}
      </h3>
      <component
        v-for="(menu, index) in MENUS_HEADER"
        :to="menu.nameRouter ? { name: menu.nameRouter } : null"
        :key="index"
        :is="menu.nameRouter ? 'router-link' : 'button'"
        class="block w-full"
        @click="() => clickLogout(menu.nameRouter)"
        :disabled="menu.nameRouter ? null : isPendingLogout"
      >
        <div
          v-if="index === MENUS_HEADER.length - 1"
          class="border-b mt-[2px] mb-[6px] border-[#ffffff1a]"
        />
        <span
          :class="[
            'text-[#eee] text-sm py-2 px-3 block hover:bg-[#30323c] rounded-lg text-left',
            isPendingLogout && !menu.nameRouter && 'bg-[#282930]',
          ]"
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
import { useAuthStore } from "@/stores/auth/auth.store";
import UserAvatar from "@/components/UserAvatar/UserAvatar.vue";
import useLogout from "@/composable/useLogout";

const router = useRouter();
const menuRef = ref(null);
const isOpenMenuHeader = ref(false);
const authStore = useAuthStore();

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

const handleLogout = useLogout();

const clickLogout = (nameRouter) => {
  if (nameRouter) return;

  handleLogout();
};
</script>

<style lang="css" scoped>
.router-link-active > span {
  background: #30323c;
}
</style>
