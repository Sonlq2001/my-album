<template>
  <div class="max-w-3xl mx-auto mb-10 min-h-[calc(100vh-64px-191px)] mt-7">
    <div class="flex items-center justify-between">
      <return-to to="/" />
      <app-button size="small" @click="handlerClickEdit">
        {{ isEdit ? "Hủy chỉnh sửa" : "Chỉnh sửa" }}
      </app-button>
    </div>

    <h1 class="border-b py-2 text-lg font-semibold border-[#eee] mt-3 mb-7">
      Thông tin cá nhân
    </h1>

    <FormVee @submit="handleSubmit">
      <div class="flex flex-col gap-3">
        <label class="font-semibold">Họ tên</label>

        <input-field
          variant="standard"
          name="name"
          placeholder="Họ tên"
          v-if="isEdit"
          overWriteClass="pt-0"
        />

        <span class="border-b border-[#eee] p-2" v-else>Lê Quang Sơn</span>
      </div>

      <div class="flex flex-col gap-3 mt-6">
        <label class="font-semibold">Email</label>
        <span class="inline-block bg-black/5 p-2 rounded-md">
          Sonweb2001@gmail.com
        </span>
      </div>

      <div class="flex flex-col mt-6 gap-3">
        <label class="font-semibold">Mật khẩu</label>

        <input-field
          variant="standard"
          name="password"
          placeholder="Mật khẩu"
          v-if="isEdit"
          overWriteClass="pt-0"
        />

        <span class="border-b border-[#eee] p-2" v-else>Lê Quang Sơn</span>
      </div>

      <upload-user-avatar :isEdit="isEdit" />

      <upload-background-user :isEdit="isEdit" />

      <div class="mt-7 flex justify-end">
        <app-button type="submit" size="small" intent="primary">
          Lưu
        </app-button>
      </div>
    </FormVee>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form as FormVee } from "vee-validate";

import InputField from "@/components/Form/InputField/InputField.vue";
import ReturnTo from "@/components/ReturnTo/ReturnTo.vue";
import AppButton from "@/components/AppButton/AppButton.vue";

import UploadUserAvatar from "../../components/UploadUserAvatar/UploadUserAvatar.vue";
import UploadBackgroundUser from "../../components/UploadBackgroundUser/UploadBackgroundUser.vue";

const isEdit = ref(false);

const handlerClickEdit = () => {
  isEdit.value = !isEdit.value;
};

const handleSubmit = () => {
  console.log("vod ay");
};
</script>

<style lang="css" scoped></style>
