<template>
  <div class="max-w-screen-xl mx-auto my-10">
    <FormVee
      @submit="handleSubmitAlbum"
      :initialValues="initValuesAlbum"
      :validation-schema="schemaCreateAlbum"
      class="flex gap-[35px] max-lg:gap-[24px] mx-6"
      v-slot="{ setFieldValue, values }"
    >
      <button
        class="md:hidden fixed z-10 right-[10px] top-[85px] bg-main text-white py-1 px-2 rounded-3xl text-sm flex items-center justify-center gap-1"
        @click="handleToggleSidebar"
        type="button"
      >
        <i class="ri-image-line" />
        ({{ values.albums?.length || 0 }})
      </button>
      <preview-image
        :setFieldValue="setFieldValue"
        class="preview-image"
        :isToggleSidebar="isToggleSidebar"
        @closeSidebar="closeSidebar"
      />

      <div class="sticky top-[100px]">
        <div class="flex-1">
          <upload-image :setFieldValue="setFieldValue" />

          <div class="mt-8">
            <input-field
              name="title"
              placeholder="Tiêu đề"
              label="Tiêu đề bức ảnh"
              variant="standard"
              overWriteClass="pl-0 py-[6px]"
            />
          </div>

          <list-categories :setFieldValue="setFieldValue" />

          <date-album />

          <div class="mt-8">
            <input-field
              name="event_album"
              placeholder="Sự kiện liên quan"
              label="Sự kiện"
              variant="standard"
              overWriteClass="pl-0"
            />
          </div>

          <div class="mt-8">
            <textarea-field
              name="story"
              label="Câu chuyện"
              placeholder="Câu chuyện của tấm hình"
            />
          </div>

          <div class="mt-8 mb-7">
            <radio-field
              label="Trạng thái"
              :options="STATUS_OPTIONS_ALBUM"
              name="status"
            />
          </div>

          <div class="flex justify-end">
            <app-button :disabled="isPendingCreateAlbum" intent="primary">
              Tạo mới
            </app-button>
          </div>
        </div>
      </div>
    </FormVee>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form as FormVee } from "vee-validate";
import { useRouter } from "vue-router";

import InputField from "@/components/Form/InputField/InputField.vue";
import TextareaField from "@/components/Form/TextareaField/TextareaField.vue";
import RadioField from "@/components/Form/RadioField/RadioField.vue";
import { useAlbumStore } from "@/stores/album/album.store";
import { useUploadStore } from "@/stores/upload/upload.store";
import useGetUserInfo from "@/composable/useGetUserInfo";
import { NamespaceRouter } from "@/constants/router.constants";
import AppButton from "@/components/AppButton/AppButton.vue";
import useGetCategory from "@/composable/useGetCategory";

import UploadImage from "../../components/UploadImage/UploadImage.vue";
import PreviewImage from "../../components/PreviewImage/PreviewImage.vue";
import ListCategories from "../../components/ListCategories/ListCategories.vue";
import DateAlbum from "../../components/DateAlbum/DateAlbum.vue";
import { schemaCreateAlbum, initValuesAlbum } from "../../helpers/album.helper";
import { STATUS_OPTIONS_ALBUM } from "../../constants/album.constants";

const { createAlbum } = useAlbumStore();
const { uploadFiles } = useUploadStore();
const { userId } = useGetUserInfo();
const router = useRouter();
useGetCategory();

const isPendingCreateAlbum = ref(false);
const isToggleSidebar = ref(false);

const handleSubmitAlbum = async (values) => {
  isPendingCreateAlbum.value = true;
  const { albums, date, time, ...rest } = values;

  const formData = new FormData();
  for (const album of albums) {
    formData.append("albums", album);
  }

  try {
    const listImage = await uploadFiles(formData);
    const reqData = {
      ...rest,
      albums: listImage,
      date: `${date} ${time}`,
      user: userId,
    };

    const newAlbum = await createAlbum(reqData);
    router.push({
      name: NamespaceRouter.ALBUM_DETAIL,
      params: { slug: newAlbum.slug },
      state: { status: rest.status },
    });
  } catch (error) {
    // TODO: handle error
  } finally {
    isPendingCreateAlbum.value = false;
  }
};

const handleToggleSidebar = () => {
  isToggleSidebar.value = !isToggleSidebar.value;
};

const closeSidebar = () => {
  isToggleSidebar.value = false;
};
</script>

<style lang="css" scoped></style>
