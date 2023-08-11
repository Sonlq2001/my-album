<template>
  <div class="max-w-screen-xl mx-auto my-10 flex">
    <!-- image preview -->
    <div class="mr-10 w-[400px]">
      <div class="mb-5">Tổng tấm hình ({{ listImageUpload.length }})</div>
      <div v-if="listImageUpload.length">
        <div
          v-for="(imageUpload, index) in listImageUpload"
          :key="index"
          class="mb-4 flex items-start"
        >
          <img
            :src="imageUpload.image"
            :alt="'upload-' + index"
            class="max-w-[200px] w-full rounded max-h-[200px] mr-4"
          />
          <div class="w-full">
            <div class="bg-gray p-2">
              <span class="text-sm text-text_gray">
                {{ imageUpload.nameFile }}
              </span>
              <span class="text-sm text-text_gray block mt-2">
                {{ imageUpload.type }}
              </span>
            </div>
            <button
              class="mt-4 flex items-center justify-center bg-main w-[20px] h-[20px] ml-auto hover:bg-sub"
              @click="handleRemoveImage(index)"
            >
              <i class="ri-close-line text-white leading-[0px]"></i>
            </button>
          </div>
        </div>
      </div>

      <div v-else class="text-text_gray">Bạn chưa chọn hình ảnh nào !</div>
    </div>
    <!-- end image preview -->

    <div class="sticky top-[100px]">
      <form class="flex-1">
        <label
          class="text-center border border-[#ccc] border-dashed py-8 cursor-pointer rounded-md block"
          for="file"
          @drop.prevent="handleDropImage"
          @dragover="handleDragoverImage"
        >
          Kéo thả hoặc chọn ảnh bất kỳ mà bạn muốn tạo album của mình.
          <span class="block text-sm text-[#aaa] mt-3"
            >Hỗ trợ các loại file JPG, JPEG, PNG,
          </span>
          <input
            type="file"
            hidden
            id="file"
            accept="image/jpeg, image/png"
            multiple
            @change="handleChangeImage"
          />
        </label>

        <div class="mt-8 mb-5">
          <label for="">Tiêu đề bức ảnh</label>
          <input
            type="text"
            placeholder="Tiêu đề"
            class="block outline-none border-b w-full py-2 border-[#eee]"
          />
        </div>

        <div class="mt-8 mb-5">
          <label for="">Chủ đề bức ảnh</label>
          <div class="flex mt-3 gap-4 border-b border-[#eee] pb-4">
            <div
              class="bg-gray text-sm p-2 rounded-3xl cursor-pointer hover:bg-[#ddd]"
            >
              Thiên nhiên
            </div>
            <div
              class="bg-main text-white text-sm p-2 rounded-3xl cursor-pointer hover:bg-sub"
            >
              Động vật
            </div>
          </div>
        </div>

        <div class="mt-8 mb-5">
          <label for="">Thời gian</label>
          <div class="flex mt-3 gap-4 border-b border-[#eee] pb-4">
            <input
              type="date"
              class="outline-none mr-4 border border-gray p-1 rounded"
            />
            <input
              type="time"
              class="outline-none border border-gray p-1 rounded"
            />
          </div>
        </div>

        <div class="mt-8 mb-5">
          <label for="">Sự kiện</label>
          <input
            type="text"
            placeholder="Sự kiện"
            class="block outline-none border-b w-full py-2 border-[#eee]"
          />
        </div>

        <div class="mt-8 mb-5">
          <label for="" class="block">Câu chuyện</label>
          <textarea
            name=""
            id=""
            cols="100"
            rows="5"
            class="w-full outline-none mt-2 border-b border-[#eee] resize-none"
            placeholder="Câu chuyện của tấm hình"
          />
        </div>

        <div class="text-right">
          <button class="text-white bg-main px-6 py-2 rounded-3xl hover:bg-sub">
            Tạo
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";

const listImageUpload = ref([]);

const handleDropImage = (e) => {
  handleImageRender(e.dataTransfer.files);
};

const handleDragoverImage = (e) => {
  e.preventDefault();
};

const handleChangeImage = (e) => {
  handleImageRender(e.target.files);
};

const handleImageRender = (files) => {
  if (!files || !files.length) return;

  for (const file of files) {
    listImageUpload.value.push({
      image: URL.createObjectURL(file),
      nameFile: file.name,
      type: file.type,
    });
  }
};

const handleRemoveImage = (idx) => {
  URL.revokeObjectURL(listImageUpload.value[idx].image);
  listImageUpload.value = listImageUpload.value.filter(
    (_, index) => index !== idx
  );
};

onUnmounted(() => {
  if (!listImageUpload.value) return;
  for (const imageUpload of listImageUpload.value) {
    URL.revokeObjectURL(imageUpload.image);
  }
});
</script>

<style lang="scss" scoped></style>
