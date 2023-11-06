<template>
  <FormVee
    @submit="handleSubmitAlbum"
    :initialValues="initValuesAlbum"
    :validation-schema="schemaCreateAlbum"
    class="max-w-screen-xl mx-auto my-10 flex"
    v-slot="{ setFieldValue }"
  >
    <preview-image :setFieldValue="setFieldValue" />

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
            :options="STATUS_ALBUM"
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
</template>

<script setup>
import { ref } from "vue";
import { Form as FormVee } from "vee-validate";
import { useRouter } from "vue-router";

import InputField from "@/components/Form/InputField/InputField.vue";
import TextareaField from "@/components/Form/TextareaField/TextareaField.vue";
import RadioField from "@/components/Form/RadioField/RadioField.vue";
import { useAlbumStore } from "@/stores/album/album.store";
import useGetUserInfo from "@/composable/useGetUserInfo";
import { NamespaceRouter } from "@/constants/router.constants";
import AppButton from "@/components/AppButton/AppButton.vue";

import UploadImage from "../../components/UploadImage/UploadImage.vue";
import PreviewImage from "../../components/PreviewImage/PreviewImage.vue";
import ListCategories from "../../components/ListCategories/ListCategories.vue";
import DateAlbum from "../../components/DateAlbum/DateAlbum.vue";
import { schemaCreateAlbum, initValuesAlbum } from "../../helpers/album.helper";
import { STATUS_ALBUM } from "../../constants/album.constants";

const { uploadFiles, createAlbum } = useAlbumStore();
const { userId } = useGetUserInfo();
const router = useRouter();
const isPendingCreateAlbum = ref(false);

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
      category: "65487d35a6bb19acb93a3caf", // TODO: category
    };

    const newAlbum = await createAlbum(reqData);
    router.push({
      name: NamespaceRouter.ALBUM_DETAIL,
      params: { album_id: newAlbum.id },
    });
  } catch (error) {
    // TODO: handle error
  } finally {
    isPendingCreateAlbum.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
