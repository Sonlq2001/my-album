<template>
  <main class="max-w-[1830px] mx-auto px-8 pt-10 mb-[70px]">
    <h1 class="font-bold text-2xl">Những bức ảnh về cuộc sống đời thường</h1>
    <p class="mt-3 text-[#656f79]">
      Kết quả tìm kiếm:
      <span class="font-semibold">20 tấm hình</span>
    </p>

    <div class="mt-7">
      <button
        class="font-sans text-sm border px-2 py-1 rounded border-[#ddd] bg-gray mr-3"
      >
        Mới nhất
      </button>
      <button class="font-sans text-sm border px-2 py-1 rounded border-[#ddd]">
        Cũ nhất
      </button>
    </div>

    <div class="mt-[50px] font-semibold text-lg">Những tấm hình nổi bật</div>

    <!-- loading -->
    <loading-item-album v-if="isLoadingAlbums" />

    <!-- map data -->
    <div
      class="mt-4 columns-4 gap-5"
      v-else-if="
        albumStore.listAlbumsData && albumStore.listAlbumsData.length > 0
      "
    >
      <item-album
        v-for="album in albumStore.listAlbumsData"
        :key="album.id"
        :album="album"
      />
    </div>

    <!-- no data -->
    <div v-else>
      <!-- TODO: no data -->
      nodata
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";

import ItemAlbum from "@/components/ItemAlbum/ItemAlbum.vue";
import { useAlbumStore } from "@/stores/album/album.store";
import LoadingItemAlbum from "@/components/LoadingItemAlbum/LoadingItemAlbum.vue";

const albumStore = useAlbumStore();
const isLoadingAlbums = ref(false);

onMounted(async () => {
  isLoadingAlbums.value = true;
  const category = window.location.pathname.split("/");

  await albumStore.getListAlbumsPublic({ category: category.pop() });
  isLoadingAlbums.value = false;
});
</script>

<style lang="css" scoped></style>
