<template>
  <div class="max-w-full w-full min-h-[calc(100vh-64px-191px)] px-6">
    <div v-if="isLoadingUserInfo">Loading...</div>
    <div class="py-8 flex gap-6 max-lg:flex-col" v-else>
      <div class="max-w-[300px] w-full info self-start">
        <h4 class="font-semibold mb-3">Giới thiệu</h4>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores
          consequuntur dicta commodi maiores recusandae animi asperiores!
        </p>
      </div>
      <div class="w-full">
        <h4 class="font-semibold mb-3">Albums</h4>
        <div
          class="columns-3 gap-4 text-[0px] max-sm:columns-2"
          v-if="listUserAlbumsInfo.length > 0"
        >
          <item-album
            :album="album"
            v-for="album in listUserAlbumsInfo"
            :key="album.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { SORT_VALUE, DEFAULT_PAGE } from "@/constants/app.constants";
import ItemAlbum from "@/components/ItemAlbum/ItemAlbum.vue";
import { useMyPageStore } from "@/stores/my-page/my-page.store";

import { DEFAULT_PER_PAGE_PROFILE } from "../../constants/my-page.constants";

const router = useRouter();
const myPageStore = useMyPageStore();

const { listUserAlbumsInfo } = storeToRefs(myPageStore);

const initParams = reactive({
  sort: SORT_VALUE.CREATED_DESC,
  page: DEFAULT_PAGE,
  perPage: DEFAULT_PER_PAGE_PROFILE,
});
const isLoadingUserInfo = ref(true);

const slugUser = router.currentRoute.value.params.slug_user;

const fetchDataProfile = (slug) => {
  Promise.all([
    myPageStore.getUserInfo(slug),
    myPageStore.getUserAlbumsInfo({ slugUser: slug, ...initParams }),
  ]).finally(() => {
    isLoadingUserInfo.value = false;
  });
};

onMounted(async () => {
  if (!slugUser) {
    return;
  }

  fetchDataProfile(slugUser);
});

watch(
  () => router.currentRoute.value.params.slug_user,
  (newSlugUser) => {
    fetchDataProfile(newSlugUser);
  }
);

onUnmounted(() => {
  myPageStore.resetUserInfo();
});
</script>

<style lang="css" scoped>
@media (min-width: 1024px) {
  .info {
    position: -webkit-sticky;
    position: sticky;
    top: 90px;
  }
}
</style>
