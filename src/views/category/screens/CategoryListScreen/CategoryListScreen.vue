<template>
  <main class="max-w-[1830px] mx-auto px-8 pt-10 mb-[70px]">
    <h1 class="font-bold text-2xl">Những bức ảnh về cuộc sống đời thường</h1>
    <p class="mt-3 text-[#656f79]">
      Kết quả tìm kiếm:
      <span v-if="!isLoadingAlbums" class="font-semibold">
        {{ albumStore.total }} tấm hình
      </span>
    </p>

    <div class="mt-7">
      <button
        :class="[
          'font-sans text-sm border px-2 py-1 rounded border-[#ddd]  mr-3',
          sort.value === initParams.sort ? 'bg-main text-white' : 'bg-gray',
        ]"
        v-for="(sort, index) in LIST_SORT"
        :index="index"
        @click="() => handlerSortAlbums(sort)"
      >
        {{ sort.label }}
      </button>
    </div>

    <div class="mt-[50px] font-semibold text-lg">Những tấm hình nổi bật</div>

    <!-- loading -->
    <loading-item-album v-if="isLoadingAlbums" />

    <!-- map data -->
    <div
      v-else-if="
        albumStore.listAlbumsData && albumStore.listAlbumsData.length > 0
      "
    >
      <div class="mt-4 columns-4 gap-5">
        <item-album
          v-for="album in albumStore.listAlbumsData"
          :key="album.id"
          :album="album"
        />
      </div>
      <div id="observe-visibility" v-observe-visibility="visibilityChanged" />
      <div class="flex justify-center mt-5" v-if="isLoadingScroll">
        <div
          class="inline-block h-7 w-7 animate-spin rounded-full border-[3px] border-solid border-main border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        />
      </div>
    </div>
    <!-- no data -->
    <div v-else>
      <!-- TODO: no data -->
      nodata
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, reactive, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";

import ItemAlbum from "@/components/ItemAlbum/ItemAlbum.vue";
import { useAlbumStore } from "@/stores/album/album.store";
import { useSearchStore } from "@/stores/search/search.store";
import LoadingItemAlbum from "@/components/LoadingItemAlbum/LoadingItemAlbum.vue";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "@/constants/app.constants";
import { getQueryStringUrl } from "@/helpers/app.helper";

import { LIST_SORT, SORT_VALUE } from "@/constants/app.constants";

const albumStore = useAlbumStore();
const searchStore = useSearchStore();
const route = useRoute();

const isLoadingAlbums = ref(false);
const isLoadingScroll = ref(false);
const initParams = reactive({
  cate: getQueryStringUrl("cate"),
  page: DEFAULT_PAGE,
  perPage: DEFAULT_PER_PAGE,
  keyword: getQueryStringUrl("keyword"),
  sort: SORT_VALUE.CREATED_DESC,
});

const fetchAlbums = async (params) => {
  try {
    await albumStore.getListAlbumsPublic({ ...initParams, ...params });
  } catch (error) {
    // TODO: handler error
  }
};

onMounted(async () => {
  isLoadingAlbums.value = true;
  await fetchAlbums();
  isLoadingAlbums.value = false;
});

const visibilityChanged = async (isVisible) => {
  if (!isVisible || albumStore.cancelLoadMore) return;

  isLoadingScroll.value = true;
  await fetchAlbums({ page: ++initParams.page });
  isLoadingScroll.value = false;
};

watch(
  () => {
    return [route.query.keyword, initParams.sort];
  },
  async () => {
    isLoadingAlbums.value = true;
    searchStore.setKeyword(route.query.keyword);

    await fetchAlbums({
      keyword: route.query.keyword,
      hasSearch: true,
    });

    isLoadingAlbums.value = false;
  }
);

onUnmounted(() => {
  searchStore.setKeyword("");
  albumStore.resetListAlbums();
});

const handlerSortAlbums = (valueSort) => {
  initParams.sort = valueSort.value;
};
</script>

<style lang="css" scoped></style>
