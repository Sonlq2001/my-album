<template>
  <div class="mx-6">
    <div class="max-w-5xl mx-auto mb-10 min-h-[calc(100vh-64px-191px)] mt-7">
      <return-to :to="MyPagePaths.MY_PAGE" />

      <h1 class="border-b py-2 text-lg font-semibold border-[#eee] mt-3 mb-7">
        Albums đã lưu
      </h1>

      <button
        :class="[
          'font-sans text-[13px] border px-2 py-[3px] rounded-3xl border-[#ddd]  mr-3',
          sort.value === initParams.sort ? 'bg-main text-white' : 'bg-gray',
        ]"
        v-for="(sort, index) in LIST_SORT"
        :key="index"
        @click="() => handlerSortAlbums(sort)"
      >
        {{ sort.label }}
      </button>

      <loading-item-album
        v-if="isLoading"
        class="mt-5 gap-5 max-lg:columns-3 max-sm:columns-2 max-sm:gap-4"
      />
      <div
        v-else-if="
          myPageStore?.listBookmarks && myPageStore?.listBookmarks?.length > 0
        "
        ref="masonry"
      >
        <div class="mt-5 gap-4 flex flex-wrap">
          <item-album
            :album="album"
            v-for="album in myPageStore?.listBookmarks"
            :key="album.id"
            class="item-album !mb-0 h-full"
            overlay
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
      <div v-else>not data</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, watch, onUnmounted } from "vue";

import ReturnTo from "@/components/ReturnTo/ReturnTo.vue";
import { LIST_SORT, SORT_VALUE } from "@/constants/app.constants";
import ItemAlbum from "@/components/ItemAlbum/ItemAlbum.vue";
import { useMyPageStore } from "@/stores/my-page/my-page.store";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "@/constants/app.constants";
import LoadingCircle from "@/components/LoadingCircle/LoadingCircle.vue";
import LoadingItemAlbum from "@/components/LoadingItemAlbum/LoadingItemAlbum.vue";

import { MyPagePaths } from "../../constants/my-page.paths.js";

const myPageStore = useMyPageStore();

const isLoading = ref(true);
const isLoadingScroll = ref(false);
const initParams = reactive({
  sort: SORT_VALUE.CREATED_DESC,
  page: DEFAULT_PAGE,
  perPage: DEFAULT_PER_PAGE,
});

onMounted(async () => {
  if (myPageStore.listBookmarks?.length) {
    isLoading.value = false;
    return;
  }

  await fetchAlbums();
  isLoading.value = false;
});

watch(
  () => initParams.sort,
  async () => {
    isLoading.value = true;
    await fetchAlbums({ hasSearch: true });
    isLoading.value = false;
  }
);

const fetchAlbums = async (params) => {
  try {
    await myPageStore.getBookmarks({ ...initParams, ...params });
  } catch (error) {
    // TODO: handler error
  }
};

const handlerSortAlbums = (valueSort) => {
  initParams.sort = valueSort.value;
  initParams.page = DEFAULT_PAGE;
};

const visibilityChanged = async (isVisible) => {
  if (!isVisible || myPageStore.bookmarks.cancelLoadMore) return;

  isLoadingScroll.value = true;
  await fetchAlbums({ page: ++initParams.page });
  isLoadingScroll.value = false;
};

onUnmounted(() => {
  if (
    initParams.page > DEFAULT_PAGE ||
    initParams.sort !== SORT_VALUE.CREATED_DESC
  ) {
    myPageStore.resetAlbumsUser();
  }
});
</script>

<style lang="css"></style>
