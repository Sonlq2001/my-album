<template>
  <div
    :class="[
      'fixed top-0 left-0 right-0 z-30',
      (!isHome || isHeaderActive) && 'bg-white border-b border-[#ddd]',
    ]"
  >
    <header
      :class="[
        'flex items-center py-3 h-[64px] px-8 max-w-[1830px] mx-auto max-sm:px-6 max-sm:py-2 max-md:h-[56px] justify-between',
        isHome && 'justify-between',
      ]"
    >
      <router-link
        :to="{ name: 'Home' }"
        :class="[
          'text-xl font-semibold leading-6',
          isHome && !isHeaderActive ? 'text-white' : 'text-black',
        ]"
      >
        MyAlbum
      </router-link>

      <!-- input search -->
      <input-search v-if="!isHome || isHeaderActive" />
      <!-- end input search -->

      <div class="flex items-center">
        <button
          class="md:hidden mr-6"
          v-if="!isHome || isHeaderActive"
          @click="handleOpenModalSearch"
        >
          <i class="ri-search-line text-[20px]" />
        </button>
        <menu-header v-if="isLogged" />
        <router-link
          :to="{ name: NamespaceRouter.LOGIN }"
          :class="[
            'px-3 py-2 rounded-3xl flex items-center md:mr-4',
            isHome && !isHeaderActive
              ? 'text-white hover:bg-white_0_1'
              : 'text-black hover:bg-black_0_1',
          ]"
          v-else
        >
          Login
        </router-link>

        <router-link
          :to="{ name: NamespaceRouter.CREATE_ALBUM }"
          class="text-white bg-main px-3 py-2 rounded-3xl flex items-center hover:bg-sub max-md:hidden"
        >
          <img
            :src="IconUpload"
            alt="icon-upload"
            class="w-[20px] text-white invert-[1] mr-1"
          />
          Upload
        </router-link>
      </div>
    </header>
  </div>

  <modal-search
    v-if="isOpenModalSearch"
    @close-modal="handleCloseModalSearch"
  />
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import debounce from "lodash.debounce";

import IconUpload from "@/assets/images/upload.svg";
import InputSearch from "@/components/InputSearch/InputSearch.vue";
import {
  TIME_DELAY_HEADER_SCROLL,
  POSITION_ACTIVE_HEADER,
} from "@/constants/header.constants.js";
import { NamespaceRouter } from "@/constants/router.constants";
import useGetUserInfo from "@/composable/useGetUserInfo";
import ModalSearch from "@/components/ModalSearch/ModalSearch.vue";

import MenuHeader from "./MenuHeader/MenuHeader.vue";

defineProps({
  isHome: {
    type: Boolean,
    default: false,
  },
});

const isHeaderActive = ref(false);
const isOpenModalSearch = ref(false);
const { isLogged } = useGetUserInfo();

const handleScrollHeader = debounce(() => {
  isHeaderActive.value = window.scrollY > POSITION_ACTIVE_HEADER;
}, TIME_DELAY_HEADER_SCROLL);

onMounted(() => {
  window.addEventListener("scroll", handleScrollHeader);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScrollHeader);
});

const handleOpenModalSearch = () => {
  isOpenModalSearch.value = true;
};

const handleCloseModalSearch = () => {
  isOpenModalSearch.value = false;
};

watch(
  () => isOpenModalSearch.value,
  (newValue) => {
    const elBody = document.querySelector("body");
    if (!elBody) return;
    elBody.style.overflow = newValue ? "hidden" : "auto";
  }
);
</script>

<style lang="scss" scoped></style>
