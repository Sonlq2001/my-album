<template>
  <div
    class="max-w-full w-full min-h-[calc(100vh-64px-191px)] overflow-hidden px-6"
  >
    <div class="py-8 flex gap-6">
      <div class="max-w-[300px] w-full">
        <div>
          <h4>Giới thiệu</h4>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores
            consequuntur dicta commodi maiores recusandae animi asperiores!
          </p>
        </div>
      </div>
      <div class="w-full">
        <h4>Albums</h4>

        <div class="columns-3 gap-4 text-[0px]">
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
import { reactive } from "vue";

import { LIST_SORT, SORT_VALUE } from "@/constants/app.constants";
import ItemAlbum from "@/components/ItemAlbum/ItemAlbum.vue";

const initParams = reactive({
  sort: SORT_VALUE.CREATED_DESC,
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
