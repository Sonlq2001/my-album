<template>
  <div
    class="max-w-full w-full min-h-[calc(100vh-64px-191px)] overflow-hidden px-6"
  >
    <div v-if="isLoadingUserInfo">Loading...</div>
    <div class="py-8 flex gap-6 max-lg:flex-col" v-else>
      <div class="max-w-[300px] w-full">
        <h4 class="font-semibold mb-3">Giới thiệu</h4>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores
          consequuntur dicta commodi maiores recusandae animi asperiores!
        </p>
      </div>
      <div class="w-full">
        <h4 class="font-semibold mb-3">Albums</h4>

        <div class="columns-3 gap-4 text-[0px] max-sm:columns-2">
          <item-album
            :album="item"
            v-for="(item, index) in data"
            :key="index"
            overlay
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { LIST_SORT, SORT_VALUE } from "@/constants/app.constants";
import ItemAlbum from "@/components/ItemAlbum/ItemAlbum.vue";
import { useMyPageStore } from "@/stores/my-page/my-page.store";

const route = useRoute();
const myPageStore = useMyPageStore();

const initParams = reactive({
  sort: SORT_VALUE.CREATED_DESC,
});
const isLoadingUserInfo = ref(true);

const slugUser = route.params.slug_user;

onMounted(async () => {
  if (!slugUser) {
    return;
  }

  await myPageStore.getUserInfo(slugUser);
  isLoadingUserInfo.value = false;
});

const data = [
  {
    title: "123",
    slug: "123",
    albumAvatar: {
      imageUrl:
        "https://cdn.pixabay.com/photo/2023/12/08/09/13/vine-8437282_1280.jpg",
    },
  },
  {
    title: "123",
    slug: "123",
    albumAvatar: {
      imageUrl:
        "https://cdn.pixabay.com/photo/2023/11/12/18/52/christmas-8383920_640.jpg",
    },
  },
  {
    title: "123",
    slug: "123",
    albumAvatar: {
      imageUrl:
        "https://cdn.pixabay.com/photo/2023/11/10/08/06/dog-8378909_640.jpg",
    },
  },
  {
    title: "123",
    slug: "123",
    albumAvatar: {
      imageUrl:
        "https://cdn.pixabay.com/photo/2023/11/22/20/31/snowman-8406382_640.jpg",
    },
  },
  {
    title: "123",
    slug: "123",
    albumAvatar: {
      imageUrl:
        "https://cdn.pixabay.com/photo/2023/12/15/03/11/fishermen-8449951_640.jpg",
    },
  },
  {
    title: "123",
    slug: "123",
    albumAvatar: {
      imageUrl:
        "https://cdn.pixabay.com/photo/2023/10/29/12/29/pumpkin-8349988_640.jpg",
    },
  },
];
</script>

<style lang="css" scoped></style>
