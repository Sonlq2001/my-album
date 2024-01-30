<template>
  <main class="max-w-[1830px] px-8 mx-auto page-top mt-7 max-sm:px-6">
    <!-- navigation -->
    <div class="flex justify-center">
      <div
        class="flex items-center flex-nowrap overflow-auto gap-5 pb-[10px] list-category"
        v-dragscroll
      >
        <router-link
          v-for="cate in listCategories"
          class="px-3 py-2 flex items-center rounded-3xl bg-gray hover:bg-black/5 text-text_gray whitespace-nowrap"
          :key="cate.id"
          :to="`${CategoryPaths.CATEGORY_LIST}?cate=${cate.slug}`"
        >
          <div v-html="cate.icon" class="mr-2" />
          <span class="text-[15px] font-bold font-sans">{{ cate.title }}</span>
        </router-link>
      </div>
    </div>
    <!-- end navigation -->

    <div
      class="mt-5 flex items-center justify-between max-lg:flex-col max-lg:items-start"
    >
      <div class="flex items-center gap-2 flex-wrap">
        <router-link
          :to="`${CategoryPaths.CATEGORY_LIST}?keyword=${keyWord.key}`"
          class="border border-[#ddd] text-sm py-1 px-2 rounded-md hover:border-main whitespace-nowrap"
          v-for="keyWord in LIST_KEY_WORDS"
          :key="keyWord.key"
        >
          {{ keyWord.key }}
        </router-link>
      </div>

      <router-link
        :to="CategoryPaths.CATEGORY_LIST"
        class="font-sans text-sm border px-2 py-1 border-[#ddd] rounded-3xl hover:bg-black/5 whitespace-nowrap max-lg:mt-5 max-lg:ml-auto"
      >
        Tất cả
        <i class="ri-more-fill"></i>
      </router-link>
    </div>

    <!-- loading -->
    <loading-item-album
      v-if="isLoadingAlbums"
      class="gap-5 max-lg:columns-3 max-sm:columns-2 max-sm:gap-4"
      :count-item="12"
    />

    <!-- map data -->
    <div
      class="relative max-h-[2500px] overflow-hidden mt-7"
      v-else-if="
        albumStore.listAlbumsData && albumStore.listAlbumsData.length > 0
      "
    >
      <div
        class="columns-4 gap-5 max-lg:columns-3 max-sm:columns-2 max-sm:gap-4 text-[0px]"
      >
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
import { DEFAULT_PAGE, DEFAULT_PER_PAGE_HOME } from "@/constants/app.constants";

import BoxMessage from "../../components/BoxMessage/BoxMessage.vue";
import { LIST_KEY_WORDS, ICONS } from "../../constants/home.constants";

const albumStore = useAlbumStore();
const categoryStore = useCategoryStore();
const isLoadingAlbums = ref(false);

onMounted(async () => {
  isLoadingAlbums.value = true;
  await albumStore.getListAlbumsPublic({
    page: DEFAULT_PAGE,
    perPage: DEFAULT_PER_PAGE_HOME,
  });
  isLoadingAlbums.value = false;
});

useGetCategory();

const listCategories = computed(() => {
  if (!categoryStore.listCategories) {
    return [];
  }
  const listCate = categoryStore?.listCategories.map((item) => {
    return { ...item, icon: ICONS[item.slug] };
  });

  return listCate;
});

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
.list-category::-webkit-scrollbar {
  display: none;
}
</style>
