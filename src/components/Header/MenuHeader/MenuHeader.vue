<template>
  <div class="flex relative md:mr-4" ref="menuRef">
    <button @click="handleClickMenu">
      <user-avatar :avatar="avatarUser" />
    </button>

    <div
      class="absolute top-[120%] right-0 w-[220px] bg-dark_menu rounded-lg p-3 transition-all flex flex-col gap-1"
      v-if="isOpenMenuHeader"
    >
      <h3 class="text-white font-semibold px-3 pt-1">
        {{ name }}
      </h3>
      <div class="border-b my-1 border-[#ffffff1a]"></div>
      <component
        v-for="(menu, index) in menusHeader"
        :to="
          menu.nameRouter
            ? { name: menu.nameRouter, params: menu.params }
            : null
        "
        :key="index"
        :is="menu.nameRouter ? 'router-link' : 'button'"
        class="block w-full"
        @click="() => clickLogout(menu.nameRouter)"
      >
        <div
          v-if="index === menusHeader.length - 1 || index === 1"
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
import { ref, watch, computed } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useRouter } from "vue-router";

import { listMenusHeader } from "@/constants/header.constants";
import UserAvatar from "@/components/UserAvatar/UserAvatar.vue";
import useLogout from "@/composable/useLogout";
import useGetUserInfo from "@/composable/useGetUserInfo";

const router = useRouter();
const { name, avatar, slugUser } = useGetUserInfo();

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

const handleLogout = useLogout();

const clickLogout = (nameRouter) => {
  if (nameRouter) return;

  handleLogout();
};

const avatarUser = computed(() => {
  return avatar || name;
});

const menusHeader = computed(() => listMenusHeader({ slug_user: slugUser }));
</script>

<style lang="css" scoped>
.router-link-active > span {
  background: #30323c;
}
</style>
