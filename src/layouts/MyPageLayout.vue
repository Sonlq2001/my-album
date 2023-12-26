<template>
  <div id="layout-my-page">
    <Header />
    <div class="pt-[64px]">
      <div class="max-w-5xl mx-auto mb-10 min-h-[calc(100vh-64px-191px)]">
        <div class="relative">
          <img
            :src="background"
            alt="bg-wall"
            class="h-[300px] w-full max-sm:h-[200px] rounded-sm"
          />
          <div class="absolute bottom-[-100px] left-[25px] text-center">
            <img
              :src="avatar"
              alt="bg-avatar"
              class="w-[150px] h-[150px] rounded-full max-sm:w-[130px] max-sm:h-[130px]"
            />
            <span class="font-semibold block mt-3">{{ name }}</span>
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
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer//Footer.vue";
import useGetUserInfo from "@/composable/useGetUserInfo";

const { avatar, background, name } = useGetUserInfo();
</script>

<style lang="scss" scoped></style>
