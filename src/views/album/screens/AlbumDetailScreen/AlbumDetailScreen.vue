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

        <div class="flex items-center gap-5">
          <button
            title="Lưu vào albums"
            class="border w-[33px] h-[33px] rounded-md border-[#ddd] hover:bg-black/5"
            @click="handleSaveAlbum"
            :disabled="isLoadingBookmark"
          >
            <i class="ri-bookmark-fill text-main" v-if="isBookmark" />
            <i class="ri-bookmark-line text-text_gray" v-else />
          </button>
          <button class="bg-main px-3 py-2 rounded-3xl text-white hover:bg-sub">
            Download <i class="ri-download-cloud-line"></i>
          </button>
        </div>
      </div>
      <!-- end tools album -->

      <!-- info album -->
      <div class="max-w-5xl mx-auto flex gap-8 mt-7">
        <div class="w-[60%]">
          <album-carousel
            :list-images="albumDetail?.albums || []"
            @click-slide="clickSlide"
            class="list-slides"
            :autoplay="4000"
          />
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

  <display-image
    v-if="isDisplayImage && albumDetail.albums?.length"
    :album-detail="albumDetail.albums"
    @close-display-images="handleCloseImages"
  />
</template>

<script setup>
import { onMounted, ref, onUnmounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import get from "lodash.get";

import { useAlbumStore } from "@/stores/album/album.store";
import { formatDate } from "@/helpers/app.helper";
import UserAvatar from "@/components/UserAvatar/UserAvatar.vue";
import useGetUserInfo from "@/composable/useGetUserInfo";
import { NamespaceRouter } from "@/constants/router.constants";

import AlbumCarousel from "../../components/AlbumCarousel/AlbumCarousel.vue";
import { STATUS_ALBUM } from "../../constants/album.constants";
import RelatedImages from "../../components/RelatedImages/RelatedImages.vue";
import DisplayImage from "../../components/DisplayImage/DisplayImage.vue";

const route = useRoute();
const router = useRouter();
const albumStore = useAlbumStore();
const { isLogged } = useGetUserInfo();

const { albumDetail } = storeToRefs(albumStore);

const historyStatusAlbum = get(router.options, "history.state.status");

const isLoadingAlbum = ref(true);
const isBookmark = ref(false);
const isLoadingBookmark = ref(false);
const isDisplayImage = ref(false);

const slug = route.params.slug;

onMounted(async () => {
  if (!slug) return;

  if (STATUS_ALBUM.PRIVATE === historyStatusAlbum) {
    await albumStore.getAlbumDetailPrivate(slug);
  } else {
    await albumStore.getAlbumDetailPublic(slug);
  }

  isBookmark.value = albumDetail.value?.isBookmark;
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

const handleSaveAlbum = async () => {
  if (!isLogged) {
    router.push({ name: NamespaceRouter.LOGIN });
    return;
  }

  isLoadingBookmark.value = true;
  const resBookmark = await albumStore.bookmarkAlbum(albumDetail.value.id);
  isLoadingBookmark.value = false;

  isBookmark.value = resBookmark;
};

const clickSlide = () => {
  isDisplayImage.value = true;
};

const handleCloseImages = () => {
  isDisplayImage.value = false;
};

watch(
  () => isDisplayImage.value,
  (newValue) => {
    const elBody = document.querySelector("body");
    if (!elBody) return;
    elBody.style.overflow = newValue ? "hidden" : "auto";
  }
);
</script>

<style lang="css">
.list-slides img {
  max-height: 400px;
  height: 100%;
}
</style>
