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

    <div v-if="isLoadingAlbumRelated">Loading...</div>
    <div
      class="relative mt-4 columns-5 gap-4 max-h-[250px] overflow-hidden mb-[60px] max-lg:columns-4 max-sm:columns-2"
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
import { watch, ref, onUnmounted } from "vue";
import { storeToRefs } from "pinia";

import ItemAlbum from "@/components/ItemAlbum/ItemAlbum.vue";
import { useAlbumStore } from "@/stores/album/album.store";
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE_RELATED,
} from "@/constants/app.constants";
import { NamespaceRouter } from "@/constants/router.constants";

const albumStore = useAlbumStore();
const { albumDetail, listAlbumsData } = storeToRefs(albumStore);

const isLoadingAlbumRelated = ref(true);

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
</script>

<style lang="css" scoped>
.load-more {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0), #fff);
}
</style>
