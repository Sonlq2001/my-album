<template>
  <div class="max-w-3xl mx-auto mb-10 min-h-[calc(100vh-64px-191px)] mt-7">
    <return-to :to="MyPagePaths.MY_PAGE" />

    <h1 class="border-b py-2 text-lg font-semibold border-[#eee] mt-3 mb-7">
      Albums của bạn
    </h1>

    <button
      :class="[
        'font-sans text-[13px] border px-2 py-[3px] rounded-3xl border-[#ddd]  mr-3',
        sort.value === initParams.sort ? 'bg-main text-white' : 'bg-gray',
      ]"
      v-for="(sort, index) in LIST_SORT"
      :index="index"
      @click="() => handlerSortAlbums(sort)"
    >
      {{ sort.label }}
    </button>

    <div class="mt-5" v-if="isLoading">Loading...</div>
    <div class="mt-5 gap-4 flex flex-wrap" v-else>
      <item-album
        v-if="
          myPageStore?.listAlbumsUser && myPageStore?.listAlbumsUser?.length > 0
        "
        :album="album"
        v-for="album in myPageStore.listAlbumsUser"
        :key="album.id"
        class="item-album !mb-0 max-h-[180px] h-full"
      />
      <div v-else>not data</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, watch } from "vue";

import ReturnTo from "@/components/ReturnTo/ReturnTo.vue";
import { LIST_SORT, SORT_VALUE } from "@/constants/app.constants";
import ItemAlbum from "@/components/ItemAlbum/ItemAlbum.vue";
import { useMyPageStore } from "@/stores/my-page/my-page.store";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "@/constants/app.constants";

import { MyPagePaths } from "../../constants/my-page.paths.js";

const myPageStore = useMyPageStore();

const isLoading = ref(true);
const initParams = reactive({
  sort: SORT_VALUE.CREATED_DESC,
  page: DEFAULT_PAGE,
  perPage: DEFAULT_PER_PAGE,
});

onMounted(async () => {
  if (myPageStore.listAlbumsUser?.length) {
    isLoading.value = false;
    return;
  }

  await fetchAlbums();
  isLoading.value = false;
});

watch(
  () => initParams.sort,
  async () => {
    await fetchAlbums();
    isLoading.value = false;
  }
);

const fetchAlbums = async (params) => {
  try {
    await myPageStore.getAlbumsUserApi({ ...initParams, ...params });
  } catch (error) {
    // TODO: handler error
  }
};

const handlerSortAlbums = (valueSort) => {
  initParams.sort = valueSort.value;
};
</script>

<style lang="css" scoped>
.item-album {
  flex: 1 0 auto;
  height: 180px;
}

.item-album:last-child {
  max-width: 400px;
}
</style>
