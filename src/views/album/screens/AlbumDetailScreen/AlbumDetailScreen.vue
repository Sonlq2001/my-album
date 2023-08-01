<template>
  <div class="max-w-[1830px] mx-auto px-8">
    <!-- tools album -->
    <div class="flex items-center mt-7 justify-between">
      <div class="flex">
        <img
          src="https://cdn.pixabay.com/photo/2016/11/21/15/13/work-harder-1845901_640.jpg"
          alt="avatar-user"
          class="w-12 h-12 rounded-full"
        />
        <div class="flex flex-col ml-3">
          <span class="font-semibold">Le Quang Son</span>
          <span class="text-sm text-[#aaa]">123 album</span>
        </div>
      </div>

      <button class="bg-main px-3 py-2 rounded-3xl text-white hover:bg-sub">
        Download <i class="ri-download-cloud-line"></i>
      </button>
    </div>
    <!-- end tools album -->

    <!-- info album -->
    <div class="max-w-5xl mx-auto flex gap-8">
      <div class="flex-1">
        <img
          src="https://cdn.pixabay.com/photo/2013/12/17/20/10/bubbles-230014_640.jpg"
          alt="my-album"
          class="w-full cursor-pointer"
        />
        <p class="text-center text-xs text-[#aaa] mt-2">
          Thể loại: JPG 1024x960
        </p>
      </div>

      <div class="flex-1">
        <div class="mb-3">
          <span>Tiêu đề</span>
          <p class="text-text_gray">
            <i class="ri-hashtag mr-3"></i>
            Những bong bóng biển
          </p>
        </div>
        <div class="mb-3">
          <span>Thời gian</span>
          <p class="text-text_gray">
            <i class="ri-calendar-event-fill mr-3"></i>
            01-08-2023
          </p>
        </div>
        <div class="mb-3">
          <span>Chủ đề</span>
          <p class="text-text_gray">
            <i class="ri-lightbulb-flash-fill mr-3"></i>
            Thiên nhiên
          </p>
        </div>
        <div class="mb-3">
          <span>Sự kiện</span>
          <p class="text-text_gray">
            <i class="ri-fire-fill mr-3"></i>
            Đi du lịch quảng nam
          </p>
        </div>
        <div>
          <span>Câu chuyện</span>
          <p class="text-text_gray">
            <i class="ri-booklet-fill mr-3"></i>
            <span>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem
              placeat sit voluptatibus temporibus ipsam provident sapiente
              recusandae possimus dolor similique omnis vitae in eos, fugit modi
              suscipit maxime molestias. Culpa.
            </span>
          </p>
        </div>
      </div>
    </div>
    <!-- end info album -->

    <!-- related image -->
    <related-images />
  </div>
</template>

<script setup>
import RelatedImages from "../../components/RelatedImages/RelatedImages.vue";
</script>

<style lang="scss" scoped></style>
