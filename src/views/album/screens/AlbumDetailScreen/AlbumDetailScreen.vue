<template>
  <div class="max-w-[1830px] mx-auto px-8">
    <!-- loading -->
    <div v-if="isLoadingAlbum">Loading...</div>

    <div v-else-if="albumDetail">
      <!-- tools album -->
      <div class="flex items-center mt-7 justify-between">
        <div class="flex">
          <user-avatar size="large" :avatar="avatarUser" />

          <div class="flex flex-col ml-3">
            <span class="font-semibold">{{ albumDetail?.user.name }}</span>
            <span class="text-sm text-[#aaa]">123 album</span>
          </div>
        </div>

        <button class="bg-main px-3 py-2 rounded-3xl text-white hover:bg-sub">
          Download <i class="ri-download-cloud-line"></i>
        </button>
      </div>
      <!-- end tools album -->

      <!-- info album -->
      <div class="max-w-5xl mx-auto flex gap-8 mt-7">
        <div class="w-[60%]">
          <album-carousel :list-images="albumDetail?.albums || []" />
        </div>

        <div class="w-[40%]">
          <div class="mb-3">
            <span>Tiêu đề</span>
            <p class="text-text_gray">
              <i class="ri-hashtag mr-3"></i>
              {{ albumDetail?.title }}
            </p>
          </div>
          <div class="mb-3">
            <span>Thời gian</span>
            <p class="text-text_gray">
              <i class="ri-calendar-event-fill mr-3"></i>
              {{ formatDate(albumDetail?.date) }}
            </p>
          </div>
          <div class="mb-3">
            <span>Chủ đề</span>
            <p class="text-text_gray">
              <i class="ri-lightbulb-flash-fill mr-3"></i>
              {{ albumDetail?.category?.title }}
            </p>
          </div>
          <div class="mb-3">
            <span>Sự kiện</span>
            <p class="text-text_gray">
              <i class="ri-fire-fill mr-3"></i>
              {{ albumDetail?.eventAlbum }}
            </p>
          </div>
          <div>
            <span>Câu chuyện</span>
            <p class="text-text_gray">
              <i class="ri-booklet-fill mr-3"></i>
              <span>
                {{ albumDetail?.story }}
              </span>
            </p>
          </div>
        </div>
      </div>
      <!-- end info album -->
    </div>

    <!-- TODO: no data -->
    <div v-else>no data album detail</div>

    <!-- related image -->
    <related-images />
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import get from "lodash.get";

import { useAlbumStore } from "@/stores/album/album.store";
import { formatDate } from "@/helpers/app.helper";
import UserAvatar from "@/components/UserAvatar/UserAvatar.vue";

import AlbumCarousel from "../../components/AlbumCarousel/AlbumCarousel.vue";
import { STATUS_ALBUM } from "../../constants/album.constants";
import RelatedImages from "../../components/RelatedImages/RelatedImages.vue";

const route = useRoute();
const router = useRouter();

const historyStatusAlbum = get(router.options, "history.state.status");

const albumStore = useAlbumStore();
const { albumDetail } = storeToRefs(albumStore);

const isLoadingAlbum = ref(true);

const slug = route.params.slug;

onMounted(async () => {
  if (!slug) return;

  if (STATUS_ALBUM.PRIVATE === historyStatusAlbum) {
    await albumStore.getAlbumDetailPrivate(slug);
  } else {
    await albumStore.getAlbumDetailPublic(slug);
  }

  isLoadingAlbum.value = false;
});

onUnmounted(() => {
  albumStore.resetAlbumDetail();
});

const avatarUser = computed(() => {
  return (
    albumStore.albumDetail?.user?.avatar?.imageUrl ||
    albumStore.albumDetail?.user?.name
  );
});
</script>

<style lang="scss" scoped></style>
