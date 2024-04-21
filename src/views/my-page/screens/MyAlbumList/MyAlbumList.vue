<template>
  <div class="mx-6">
    <div
      class="max-w-5xl mx-auto mb-10 min-h-[calc(100vh-64px-191px)] mt-7 overflow-hidden"
    >
      <return-to :to="MyPagePaths.MY_PAGE" />

      <h1 class="border-b py-2 text-lg font-semibold border-[#eee] mt-3 mb-7">
        Albums của bạn
      </h1>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <select
            class="cursor-pointer bg-gray border border-[#ddd] text-[13px] rounded-3xl focus:ring-main focus:border-main px-2 py-[4px] outline-none mr-3"
            @change="handlerSortAlbums"
          >
            <option
              v-for="(sort, index) in LIST_SORT"
              :key="index"
              :value="sort.value"
            >
              {{ sort.label }}
            </option>
          </select>

          <button
            :class="[
              'text-[13px] border px-2 py-[4px] rounded-3xl border-[#ddd] mr-3 whitespace-nowrap',
              filter.value === initParams.filter
                ? 'bg-main text-white'
                : 'bg-gray',
            ]"
            v-for="(filter, index) in LIST_FILTER_ALBUMS"
            :key="index"
            @click="() => handleFilterAlbums(filter)"
          >
            {{ filter.label }}
          </button>
        </div>

        <remove-albums :listCheckedAlbums="listCheckedAlbums" />
      </div>

      <loading-item-album
        v-if="isLoading"
        class="mt-5 gap-5 max-lg:columns-3 max-sm:columns-2 max-sm:gap-4"
      />
      <div
        v-else-if="
          myPageStore?.listAlbumsUser && myPageStore?.listAlbumsUser?.length > 0
        "
      >
        <div class="mt-5 gap-4 flex flex-wrap">
          <div
            v-for="album in myPageStore?.listAlbumsUser"
            class="item-album relative overflow-hidden"
          >
            <item-album
              :album="album"
              :key="album.id"
              class="!mb-0 h-full overflow-hidden"
              overlay
              isCheckbox
            />
            <input
              type="checkbox"
              class="w-[20px] h-[20px] absolute top-3 right-3 cursor-pointer"
              :value="album.id"
              v-model="listCheckedAlbums"
            />
          </div>
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

import RemoveAlbums from "../../components/RemoveAlbums/RemoveAlbums.vue";

import { MyPagePaths } from "../../constants/my-page.paths.js";
import {
  LIST_FILTER_ALBUMS,
  FILTER_VALUE,
} from "../../constants/my-page.constants";

const myPageStore = useMyPageStore();

const isLoading = ref(true);
const isLoadingScroll = ref(false);
const initParams = reactive({
  sort: SORT_VALUE.CREATED_DESC,
  filter: FILTER_VALUE.ALL,
  page: DEFAULT_PAGE,
  perPage: DEFAULT_PER_PAGE,
});
const listCheckedAlbums = ref([]);

onMounted(async () => {
  if (myPageStore.listAlbumsUser?.length) {
    isLoading.value = false;
    return;
  }

  await fetchAlbums();
  isLoading.value = false;
});

watch(
  () => [initParams.sort, initParams.filter],
  async () => {
    listCheckedAlbums.value = [];

    isLoading.value = true;
    await fetchAlbums({ hasSearch: true });
    isLoading.value = false;
  }
);

const fetchAlbums = async (params) => {
  try {
    await myPageStore.getAlbumsUser({ ...initParams, ...params });
  } catch (error) {
    // TODO: handler error
  }
};

const handlerSortAlbums = (e) => {
  initParams.sort = e.target.value;
  initParams.page = DEFAULT_PAGE;
};

const handleFilterAlbums = (filter) => {
  initParams.filter = filter.value;
  initParams.page = DEFAULT_PAGE;
};

const visibilityChanged = async (isVisible) => {
  if (!isVisible || myPageStore.albumsUser.cancelLoadMore) return;

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

<style lang="css">
.item-album {
  flex: 1 0 auto;
  height: 180px;
  max-width: 100%;
  display: flex;
  justify-content: center;
}

.item-album img {
  width: auto;
}

@media (min-width: 640px) {
  .item-album:last-child {
    max-width: 400px;
  }
}
</style>
