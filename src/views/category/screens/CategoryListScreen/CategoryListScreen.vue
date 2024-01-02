<template>
  <main class="max-w-[1830px] mx-auto px-8 pt-10 mb-[70px] max-sm:px-6">
    <h1 class="font-bold text-2xl">{{ titleCategory }}</h1>
    <p class="mt-3 text-[#656f79]">
      Kết quả tìm kiếm:
      <span v-if="!isLoadingAlbums" class="font-semibold">
        {{ albumStore.total }} tấm hình
      </span>
    </p>

    <div class="mt-7">
      <button
        :class="[
          'font-sans text-sm border px-2 py-1 rounded-3xl border-[#ddd]  mr-3',
          sort.value === initParams.sort
            ? 'bg-main text-white hover:bg-sub'
            : 'bg-gray hover:bg-[#eee]',
        ]"
        v-for="(sort, index) in LIST_SORT"
        :key="index"
        @click="() => handlerSortAlbums(sort)"
      >
        {{ sort.label }}
      </button>
    </div>

    <div class="mt-[50px] font-semibold text-lg">Những tấm hình nổi bật</div>

    <!-- loading -->
    <loading-item-album
      v-if="isLoadingAlbums"
      class="gap-5 max-lg:columns-3 max-sm:columns-2 max-sm:gap-4"
    />

    <!-- map data -->
    <div
      v-else-if="
        albumStore.listAlbumsData && albumStore.listAlbumsData.length > 0
      "
    >
      <div
        class="mt-4 columns-4 gap-5 max-lg:columns-3 max-sm:columns-2 max-sm:gap-4 text-[0px]"
      >
        <item-album
          v-for="album in albumStore.listAlbumsData"
          :key="album.id"
          :album="album"
        />
      </div>
      <div
        id="observe-visibility"
        v-observe-visibility="{
          callback: visibilityChanged,
          throttle: 100,
        }"
      />
      <div class="flex justify-center mt-5" v-if="isLoadingScroll">
        <loading-circle />
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
import { onMounted, ref, reactive, onUnmounted, watch, computed } from "vue";
import { useRoute } from "vue-router";

import ItemAlbum from "@/components/ItemAlbum/ItemAlbum.vue";
import { useAlbumStore } from "@/stores/album/album.store";
import { useSearchStore } from "@/stores/search/search.store";
import LoadingItemAlbum from "@/components/LoadingItemAlbum/LoadingItemAlbum.vue";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "@/constants/app.constants";
import { getQueryStringUrl } from "@/helpers/app.helper";
import { LIST_SORT, SORT_VALUE } from "@/constants/app.constants";
import LoadingCircle from "@/components/LoadingCircle/LoadingCircle.vue";

import { TITLE_CATEGORIES } from "../../constants/category.constants";

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
  initParams.page = DEFAULT_PAGE;
};

const titleCategory = computed(() => {
  return route.query?.cate
    ? `Những bức ảnh về ${TITLE_CATEGORIES[route.query.cate]}`
    : "Tất cả những bức ảnh từ mọi chủ đề.";
});
</script>

<style lang="css" scoped></style>
