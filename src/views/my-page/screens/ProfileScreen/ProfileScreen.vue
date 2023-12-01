<template>
  <div v-if="isLoading">Loading...</div>
  <div
    class="max-w-3xl mx-auto mb-10 min-h-[calc(100vh-64px-191px)] mt-7"
    v-else
  >
    <div class="flex items-center justify-between">
      <return-to :to="MyPagePaths.MY_PAGE" />
      <app-button size="small" @click="handlerClickEdit">
        {{ isEdit ? "Hủy chỉnh sửa" : "Chỉnh sửa" }}
      </app-button>
    </div>

    <h1 class="border-b py-2 text-lg font-semibold border-[#eee] mt-3 mb-7">
      Thông tin cá nhân
    </h1>

    <FormVee
      @submit="handleSubmit"
      :initial-values="initValuesProfile"
      :validation-schema="schemaUpdateProfile"
      v-slot="{ setFieldValue }"
    >
      <div class="flex flex-col">
        <label class="font-semibold mb-3">Họ tên</label>

        <input-field
          variant="standard"
          name="name"
          placeholder="Họ tên"
          v-if="isEdit"
          overWriteClass="pt-0 pb-2"
        />

        <span class="border-b border-[#eee] p-2" v-else>{{ user?.name }}</span>
      </div>

      <div class="flex flex-col gap-3 mt-6">
        <label class="font-semibold">Email</label>
        <span class="inline-block bg-black/5 p-2 rounded-md">
          {{ user?.email }}
        </span>
      </div>

      <div class="flex flex-col mt-6">
        <label class="font-semibold mb-3">Mật khẩu</label>

        <input-field
          variant="standard"
          name="password"
          placeholder="Mật khẩu"
          v-if="isEdit"
          overWriteClass="pt-0 pb-2"
        />

        <span class="border-b border-[#eee] p-2" v-else>Lê Quang Sơn</span>
      </div>

      <upload-user-avatar
        :isEdit="isEdit"
        :setFieldValue="setFieldValue"
        :avatar="user?.avatar?.imageUrl"
      />

      <upload-background-user
        :isEdit="isEdit"
        :setFieldValue="setFieldValue"
        :background="user?.background?.imageUrl"
      />

      <div class="mt-7 flex justify-end" v-if="isEdit">
        <app-button type="submit" size="small" intent="primary">
          Lưu
        </app-button>
      </div>
    </FormVee>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Form as FormVee } from "vee-validate";
import { storeToRefs } from "pinia";

import InputField from "@/components/Form/InputField/InputField.vue";
import ReturnTo from "@/components/ReturnTo/ReturnTo.vue";
import AppButton from "@/components/AppButton/AppButton.vue";
import useGetUserInfo from "@/composable/useGetUserInfo";
import { useUploadStore } from "@/stores/upload/upload.store";
import { useMyPageStore } from "@/stores/my-page/my-page.store";

import {
  initValuesProfile,
  schemaUpdateProfile,
} from "../../helpers/profile.helpers";
import UploadUserAvatar from "../../components/UploadUserAvatar/UploadUserAvatar.vue";
import UploadBackgroundUser from "../../components/UploadBackgroundUser/UploadBackgroundUser.vue";
import { MyPagePaths } from "../../constants/my-page.paths";

const { userId } = useGetUserInfo();
const { uploadFiles } = useUploadStore();
const myPageStore = useMyPageStore();
const { user } = storeToRefs(myPageStore);
const isEdit = ref(false);
const isLoading = ref(true);

onMounted(async () => {
  await myPageStore.getUser(userId);
  isLoading.value = false;
});

const handlerClickEdit = () => {
  isEdit.value = !isEdit.value;
};

const handleSubmit = async ({ avatar, background, ...reset }) => {
  const filterImage = [avatar, background].filter((file) => file);

  let listImage = [];
  let isAvatar;
  if (filterImage.length) {
    isAvatar = Boolean(avatar) && filterImage.length === 1;

    const formData = new FormData();
    for (const album of filterImage) {
      formData.append("albums", album);
    }

    listImage = await uploadFiles(formData);
  }

  let imageBackground;

  if (listImage.length === 2) {
    imageBackground = listImage[1];
  } else if (!isAvatar && listImage.length === 1) {
    imageBackground = listImage[0];
  }

  try {
    const payload = {
      ...reset,
      avatar: isAvatar || listImage.length === 2 ? listImage[0] : undefined,
      background: imageBackground,
      userId,
    };

    await myPageStore.updateProfileUser(payload);
    isEdit.value = false;
  } catch (error) {
    // TODO: handler error
  }
};
</script>

<style lang="css" scoped></style>
