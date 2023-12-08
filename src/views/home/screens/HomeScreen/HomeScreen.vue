<template>
  <main class="max-w-[1830px] px-8 mx-auto page-top mt-7">
    <!-- navigation -->
    <div class="flex items-center justify-center">
      <router-link
        v-for="cate in listCategories"
        class="px-3 py-2 flex items-center rounded-3xl mr-5 bg-gray hover:bg-black/5 text-main"
        :key="cate.id"
        :to="`${CategoryPaths.CATEGORY_LIST}?cate=${cate.slug}`"
      >
        <span class="text-sm font-semibold font-sans">{{ cate.title }}</span>
      </router-link>
    </div>
    <!-- end navigation -->

    <div class="mt-7 text-right">
      <router-link
        :to="CategoryPaths.CATEGORY_LIST"
        class="font-sans text-sm border px-2 py-1 border-[#ddd] rounded-3xl hover:bg-black/5"
      >
        Mới nhất
      </router-link>
    </div>

    <!-- loading -->
    <loading-item-album v-if="isLoadingAlbums" />

    <!-- map data -->
    <div
      class="relative"
      v-else-if="
        albumStore.listAlbumsData && albumStore.listAlbumsData.length > 0
      "
    >
      <div class="mt-7 columns-4 gap-5">
        <item-album
          v-for="album in albumStore.listAlbumsData"
          :key="album.id"
          :album="album"
        />
      </div>

      <div
        class="absolute bottom-0 left-0 right-0 text-center load-more h-[190px] z-20 flex justify-center items-end"
      >
        <router-link
          :to="CategoryPaths.CATEGORY_LIST"
          class="border border-[#bbb] rounded-2xl px-3 py-1 text-md bg-white inline-block mb-7 hover:bg-gray"
        >
          Xem thêm
        </router-link>
      </div>
    </div>

    <!-- no data -->
    <div v-else>nodata</div>

    <div class="mt-[100px]" />

    <box-message />
  </main>
</template>

<script setup>
import { onMounted, ref, computed, onUnmounted } from "vue";

import ItemAlbum from "@/components/ItemAlbum/ItemAlbum.vue";
import { useAlbumStore } from "@/stores/album/album.store";
import { useCategoryStore } from "@/stores/category/category.store";
import LoadingItemAlbum from "@/components/LoadingItemAlbum/LoadingItemAlbum.vue";
import useGetCategory from "@/composable/useGetCategory";
import { CategoryPaths } from "@/views/category/category";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "@/constants/app.constants";

import BoxMessage from "../../components/BoxMessage/BoxMessage.vue";

const albumStore = useAlbumStore();
const categoryStore = useCategoryStore();
const isLoadingAlbums = ref(false);

onMounted(async () => {
  isLoadingAlbums.value = true;
  await albumStore.getListAlbumsPublic({
    page: DEFAULT_PAGE,
    perPage: DEFAULT_PER_PAGE,
  });
  isLoadingAlbums.value = false;
});

useGetCategory();

const listCategories = computed(() => categoryStore.listCategories || []);

onUnmounted(() => {
  albumStore.resetListAlbums();
});
</script>

<style lang="css" scoped>
.router-link-active > i {
  color: #00ab6b;
}
.load-more {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0), #fff);
}
</style>
