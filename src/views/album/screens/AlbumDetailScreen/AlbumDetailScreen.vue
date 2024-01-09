<template>
  <div class="max-w-[1830px] mx-auto px-8 max-sm:px-6">
    <!-- loading -->
    <div v-if="isLoadingAlbum">Loading...</div>

    <div v-else-if="albumDetail">
      <!-- tools album -->
      <div class="flex items-center mt-7 justify-between">
        <div class="flex">
          <router-link
            :to="{
              name: NamespaceRouter.PROFILE,
              params: { slug_user: albumDetail?.user.slug },
            }"
          >
            <user-avatar size="large" :avatar="avatarUser" />
          </router-link>

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
          <button
            @click="handleDownloadImages"
            class="bg-main px-3 py-2 rounded-3xl text-white hover:bg-sub"
          >
            Download <i class="ri-download-cloud-line"></i>
          </button>
        </div>
      </div>
      <!-- end tools album -->

      <!-- info album -->
      <div
        class="max-w-5xl mx-auto flex gap-8 mt-7 max-lg:flex-col max-sm:gap-5"
      >
        <div class="w-[60%] max-lg:w-full">
          <album-carousel
            :list-images="albumDetail?.albums || []"
            @click-slide="clickSlide"
            class="list-slides"
            :autoplay="4000"
          />
        </div>

        <div class="w-[40%] max-lg:w-full">
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
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import JSZip from "jszip";

import { useAlbumStore } from "@/stores/album/album.store";
import { formatDate } from "@/helpers/app.helper";
import UserAvatar from "@/components/UserAvatar/UserAvatar.vue";
import useGetUserInfo from "@/composable/useGetUserInfo";
import { NamespaceRouter } from "@/constants/router.constants";

import AlbumCarousel from "../../components/AlbumCarousel/AlbumCarousel.vue";
import { KEY_STATUS_ALBUM } from "../../constants/album.constants";
import RelatedImages from "../../components/RelatedImages/RelatedImages.vue";
import DisplayImage from "../../components/DisplayImage/DisplayImage.vue";

const router = useRouter();
const albumStore = useAlbumStore();
const { isLogged } = useGetUserInfo();

const { albumDetail } = storeToRefs(albumStore);

const isLoadingAlbum = ref(false);
const isBookmark = ref(false);
const isLoadingBookmark = ref(false);
const isDisplayImage = ref(false);

const slug = router.currentRoute.value.params.slug;

onMounted(async () => {
  if (!slug) return;
  const statusAlbum =
    router.currentRoute.value.query?.status === KEY_STATUS_ALBUM.private;
  isLoadingAlbum.value = true;

  if (statusAlbum) {
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

watch(
  () => router.currentRoute.value.params.slug,
  async (newSlug) => {
    isLoadingAlbum.value = true;

    await albumStore.getAlbumDetailPublic(newSlug);
    isBookmark.value = albumDetail.value?.isBookmark;
    isLoadingAlbum.value = false;
  }
);

// handle zip files
const convertImagesZipFiles = async (dataAlbums) => {
  const blobArray = dataAlbums.map(async (item) => {
    const blobs = await fetch(item.imageUrl).then((response) =>
      response.blob()
    );
    return blobs;
  });
  const resBlobs = await Promise.all(blobArray);
  const zip = new JSZip();

  resBlobs.forEach((blob, index) => {
    const typeFile = blob.type.split("/").pop();
    zip.file(`image_${index + 1}.${typeFile}`, blob);
  });

  return await zip.generateAsync({ type: "blob" });
};

const handleSaveFiles = async (dataAlbums = [], multipleFiles = false) => {
  let dataDownload, options;
  const stringRandom = Math.random().toString(36).slice(2);
  if (multipleFiles) {
    await convertImagesZipFiles(dataAlbums);

    dataDownload = await convertImagesZipFiles(dataAlbums);
    options = {
      suggestedName: `albums_${stringRandom}.zip`,
      types: [
        {
          description: "Zip",
          accept: {
            "application/zip": [".zip"],
          },
        },
      ],
    };
  } else {
    const fileImage = dataAlbums[0];
    const typeFile = fileImage.imageUrl.split(".").pop();
    dataDownload = await fetch(`${fileImage.imageUrl}`).then((response) =>
      response.blob()
    );
    options = {
      types: [
        {
          description: "Images",
          accept: {
            "image/*": [".png", ".jpeg", ".jpg"],
          },
        },
      ],
      suggestedName: `image_${stringRandom}.${typeFile}`,
    };
  }

  const handle = await showSaveFilePicker(options);
  const writable = await handle.createWritable();
  await writable.write(dataDownload);
  await writable.close();
};

const handleSaveFilesWhenBrowserNotSupport = async (
  dataAlbums = [],
  multipleFiles = false
) => {
  if (multipleFiles) {
    const zipFile = await convertImagesZipFiles(dataAlbums);
    const blobURL = URL.createObjectURL(zipFile);
    createElementDownload(blobURL, multipleFiles);
  } else {
    const blobURL = dataAlbums[0].imageUrl;
    const urlDownload = blobURL.replace("/upload/", "/upload/fl_attachment/");
    createElementDownload(urlDownload);
  }
};

const handleDownloadImages = async () => {
  const dataAlbums = albumDetail.value.albums;

  if (!dataAlbums) return;

  const supportsFileSystemAccess =
    "showSaveFilePicker" in window &&
    (() => {
      try {
        return window.self === window.top;
      } catch {
        return false;
      }
    })();

  if (!supportsFileSystemAccess) {
    handleSaveFilesWhenBrowserNotSupport(dataAlbums, dataAlbums.length > 1);
    return;
  }

  try {
    await handleSaveFiles(dataAlbums, dataAlbums.length > 1);
  } catch (err) {
    //TODO: Fail silently if the user has simply canceled the dialog.
  }
};

const createElementDownload = (url, multipleFiles = false) => {
  const stringRandom = Math.random().toString(36).slice(2);
  const a = document.createElement("a");
  a.href = url;
  a.download = multipleFiles ? `albums_${stringRandom}.zip` : "";
  a.style.display = "none";
  document.body.append(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    a.remove();
  }, 1000);
};
</script>

<style lang="css">
.list-slides img {
  max-height: 400px;
  height: 100%;
}
</style>
