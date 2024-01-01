<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex justify-between overflow-hidden h-[100dvh]"
    >
      <div
        class="bg-[#0f172a40] absolute inset-0 overlay"
        @click="handleCloseModal"
      />
      <div
        class="mt-[80px] absolute flex items-center flex-col mx-6 left-0 right-0"
      >
        <div class="max-w-[570px] w-full mx-auto">
          <div class="relative w-full input-search">
            <loading-circle-dot
              class="absolute top-[36%] -translate-y-1/2 text-[20px] left-[14px] w-[20px] h-[20px]"
              v-if="isLoadingSearch"
            />
            <i
              class="absolute top-1/2 -translate-y-1/2 ri-search-line text-[20px] left-[14px]"
              v-else
            />
            <input
              type="text"
              class="w-full rounded-2xl outline-none py-4 pl-[48px] pr-4"
              placeholder="Tìm kiếm tất cả hình ảnh của bạn"
              @input="handleSearch"
            />
          </div>

          <div
            class="w-full mt-2 bg-white rounded-2xl px-4 py-5"
            v-if="
              appStore.listSearchAlbums && appStore.listSearchAlbums.length > 0
            "
          >
            <span class="inline-block mb-3 text-text_gray">
              Kết quả: {{ appStore.searchAlbums.total }}
            </span>

            <div class="max-h-[320px] overflow-auto">
              <div
                class="flex gap-5 mb-4"
                v-for="album in appStore.listSearchAlbums"
                :key="album.id"
                @click="handleGoToAlbumDetail(album.slug)"
              >
                <div class="max-w-[150px] w-full max-sm:max-w-[130px]">
                  <img
                    :src="album.albumAvatar.imageUrl"
                    alt=""
                    class="max-h-[100px] max-w-auto rounded-[4px]"
                  />
                </div>
                <div class="text-sm text-text_gray">
                  <p class="mb-2">{{ album.title }}</p>
                  <p class="text-[#aaa] text-xs">
                    {{ formatDate(album.date) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import debounce from "lodash.debounce";
import { useRouter } from "vue-router";

import { useAppStore } from "@/stores/app/app.store";
import LoadingCircleDot from "@/components/LoadingCircleDot/LoadingCircleDot.vue";
import { NamespaceRouter } from "@/constants/router.constants";
import { formatDate } from "@/helpers/app.helper";

const router = useRouter();
const appStore = useAppStore();

const emits = defineEmits(["close-modal"]);

const isLoadingSearch = ref(false);

const handleCloseModal = () => {
  emits("close-modal");
  appStore.resetSearchAlbums();
};

const handleSearch = debounce(async (e) => {
  const keyword = e.target.value.trim();

  if (!keyword) {
    appStore.resetSearchAlbums();
    return;
  }

  isLoadingSearch.value = true;
  await appStore.getSearchAlbums(keyword);

  isLoadingSearch.value = false;
}, 500);

onUnmounted(() => {
  appStore.resetSearchAlbums();
});

const handleGoToAlbumDetail = (slug) => {
  router.push({ name: NamespaceRouter.ALBUM_DETAIL, params: { slug } });
  emits("close-modal");
};
</script>

<style lang="css" scoped>
.input-search {
  -webkit-animation: AnimationModalSearch 0.3s ease-in-out;
  -moz-animation: AnimationModalSearch 0.3s ease-in-out;
  -ms-animation: AnimationModalSearch 0.3s ease-in-out;
  -o-animation: AnimationModalSearch 0.3s ease-in-out;
  animation: AnimationModalSearch 0.3s ease-in-out;
}

@keyframes AnimationModalSearch {
  from {
    transform: scale(0.9);
    -webkit-transform: scale(0.9);
    -moz-transform: scale(0.9);
    -ms-transform: scale(0.9);
    -o-transform: scale(0.9);
  }
  to {
    transform: scale(1);
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
  }
}

@keyframes FadeSearch {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.overlay {
  backdrop-filter: blur(8px);
  animation: FadeSearch 0.3s 1;
  -webkit-animation: FadeSearch 0.3s 1;
  -moz-animation: FadeSearch 0.3s 1;
  -ms-animation: FadeSearch 0.3s 1;
  -o-animation: FadeSearch 0.3s 1;
}
</style>
