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

        <div class="mt-8 mb-5">
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

        <div class="mt-8 mb-5">
          <input-field
            name="event"
            placeholder="Sự kiện liên quan"
            label="Sự kiện"
            variant="standard"
            overWriteClass="pl-0"
          />
        </div>

        <div class="mt-8 mb-7">
          <textarea-field
            name="story"
            label="Câu chuyện"
            placeholder="Câu chuyện của tấm hình"
          />
        </div>

        <div class="text-right">
          <button
            class="text-white bg-main px-6 py-2 rounded-3xl hover:bg-sub"
            type="submit"
          >
            Tạo
          </button>
        </div>
      </div>
    </div>
  </FormVee>
</template>

<script setup>
import { Form as FormVee } from "vee-validate";

import InputField from "@/components/Form/InputField/InputField.vue";
import TextareaField from "@/components/Form/TextareaField/TextareaField.vue";
import UploadImage from "../../components/UploadImage/UploadImage.vue";
import PreviewImage from "../../components/PreviewImage/PreviewImage.vue";
import ListCategories from "../../components/ListCategories/ListCategories.vue";
import DateAlbum from "../../components/DateAlbum/DateAlbum.vue";

import { schemaCreateAlbum, initValuesAlbum } from "../../helpers/album.helper";

const handleSubmitAlbum = (values) => {
  // TODO: call api
  console.log(values);
};
</script>

<style lang="scss" scoped></style>
