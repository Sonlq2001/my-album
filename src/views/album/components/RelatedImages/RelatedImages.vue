<template>
  <div class="mt-[60px]">
    <div class="flex items-center justify-between">
      <h3 class="font-semibold">Hình ảnh liên quan</h3>
      <router-link
        :to="{
          name: NamespaceRouter.LIST_CATEGORY,
          query: {
            cate: albumDetail?.category.slug,
          },
        }"
        class="text-sm text-text_gray bg-gray px-[10px] py-[6px] rounded-3xl hover:bg-black/5"
      >
        Xem thêm
      </router-link>
    </div>

    <loading-item-album
      v-if="isLoadingAlbumRelated"
      class="mt-4 columns-5 gap-4 max-lg:columns-4 max-md:columns-3 max-sm:columns-2"
      :count-item="countItemLoading"
    />

    <div
      class="relative mt-4 columns-5 gap-4 max-h-[250px] overflow-hidden mb-[60px] max-lg:columns-4 max-md:columns-3 max-sm:columns-2"
      v-else
    >
      <item-album
        v-for="album in listAlbumsData"
        :key="album.id"
        :album="album"
        class="!mb-2"
      />
      <div
        class="absolute bottom-0 left-0 right-0 text-center load-more h-[200px] z-20 flex justify-center items-end"
      />
    </div>
  </div>
</template>

<script setup>
import { watch, ref, onUnmounted, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import debounce from "lodash.debounce";

import ItemAlbum from "@/components/ItemAlbum/ItemAlbum.vue";
import { useAlbumStore } from "@/stores/album/album.store";
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE_RELATED,
  TIME_DELAY_RESIZE,
  BREAKPOINTS,
} from "@/constants/app.constants";
import { NamespaceRouter } from "@/constants/router.constants";
import LoadingItemAlbum from "@/components/LoadingItemAlbum/LoadingItemAlbum.vue";

const albumStore = useAlbumStore();
const { albumDetail, listAlbumsData } = storeToRefs(albumStore);

const isLoadingAlbumRelated = ref(true);
const countItemLoading = ref(0);

watch(
  () => albumDetail.value,
  async (newValue) => {
    const slugCategory = newValue.category.slug;
    if (!slugCategory) return;

    await albumStore.getListAlbumsPublic({
      cate: slugCategory,
      page: DEFAULT_PAGE,
      perPage: DEFAULT_PER_PAGE_RELATED,
    });

    isLoadingAlbumRelated.value = false;
  }
);

onUnmounted(() => {
  albumStore.resetListAlbums();
});

const calcItemLoading = () => {
  const withBrowser = window.innerWidth;
  if (withBrowser > BREAKPOINTS.MIN_LG) {
    countItemLoading.value = 5;
    return;
  }
  if (withBrowser > BREAKPOINTS.MIN_MD) {
    countItemLoading.value = 4;
    return;
  }
  if (withBrowser > BREAKPOINTS.MIN_SM) {
    countItemLoading.value = 3;
    return;
  }
  countItemLoading.value = 2;
};

const handleResize = debounce(() => {
  calcItemLoading();
}, TIME_DELAY_RESIZE);

onMounted(() => {
  calcItemLoading();

  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="css" scoped>
.load-more {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0), #fff);
}
</style>
