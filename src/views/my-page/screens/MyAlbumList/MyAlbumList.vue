<template>
  <div class="max-w-3xl mx-auto mb-10 min-h-[calc(100vh-64px-191px)] mt-7">
    <return-to :to="MyPagePaths.MY_PAGE" />

    <h1 class="border-b py-2 text-lg font-semibold border-[#eee] mt-3 mb-7">
      Albums của bạn
    </h1>

    <button
      :class="[
        'font-sans text-sm border px-2 py-1 rounded border-[#ddd]  mr-3',
        // sort.value === initParams.sort ? 'bg-main text-white' : 'bg-gray',
      ]"
      v-for="(sort, index) in LIST_SORT"
      :index="index"
      @click="() => handlerSortAlbums(sort)"
    >
      {{ sort.label }}
    </button>

    <div class="mt-5 gap-5 flex flex-wrap">
      <item-album
        :album="{
          title: '123',
          slug: '123',
          albumAvatar: {
            imageUrl:
              'https://cdn.pixabay.com/photo/2023/09/29/11/19/sunrays-8283601_640.jpg',
          },
        }"
        v-for="item in [1, 2, 3, 4, 5]"
        :key="item"
        class="item-album mb-0"
      />
    </div>
  </div>
</template>

<script setup>
import ReturnTo from "@/components/ReturnTo/ReturnTo.vue";
import AppButton from "@/components/AppButton/AppButton.vue";
import { LIST_SORT } from "@/constants/app.constants";
import ItemAlbum from "@/components/ItemAlbum/ItemAlbum.vue";

import { MyPagePaths } from "../../constants/my-page.paths.js";
</script>

<style lang="css" scoped>
.item-album {
  width: calc((100% / 3) - 13.5px);
}
</style>
