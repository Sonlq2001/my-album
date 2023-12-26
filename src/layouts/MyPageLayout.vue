<template>
  <div id="layout-my-page">
    <Header />
    <div class="pt-[64px]">
      <div class="max-w-5xl mx-auto mb-10 min-h-[calc(100vh-64px-191px)]">
        <div class="relative">
          <img
            :src="dataUser.background"
            alt="bg-wall"
            class="h-[300px] w-full max-sm:h-[200px] rounded-sm"
          />
          <div class="absolute bottom-[-100px] left-[25px] text-center">
            <img
              :src="dataUser.avatar"
              alt="bg-avatar"
              class="w-[150px] h-[150px] rounded-full max-sm:w-[130px] max-sm:h-[130px]"
            />
            <span class="font-semibold block mt-3">{{ dataUser.name }}</span>
          </div>
        </div>

        <div class="mt-[100px]">
          <slot />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { computed } from "vue";

import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer//Footer.vue";
import useGetUserInfo from "@/composable/useGetUserInfo";

import { useMyPageStore } from "@/stores/my-page/my-page.store";

const { avatar, background, name } = useGetUserInfo();
const myPageStore = useMyPageStore();

const dataUser = computed(() => {
  if (window.location.pathname === "/my-page") {
    return { avatar, background, name };
  }

  return {
    name: myPageStore.userInfo?.name,
    avatar: myPageStore.userInfo?.avatar.imageUrl,
    background: myPageStore.userInfo?.background.imageUrl,
  };
});
</script>

<style lang="scss" scoped></style>
