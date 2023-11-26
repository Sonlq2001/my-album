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

      <div class="flex flex-col gap-3 mt-6 border-b border-[#eee]">
        <label class="font-semibold">Email</label>
        <span class="bg-black/5 p-2">Sonweb2001@gmail.com</span>
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

      <div class="flex flex-col gap-3 mt-6 border-b border-[#eee] pb-2">
        <label class="font-semibold">Avatar</label>
        <img
          src="https://cdn.pixabay.com/photo/2023/11/13/18/09/forest-8386084_640.jpg"
          alt="avatar"
          class="w-[120px] h-[120px] rounded-full"
        />
        <span class="text-xs">Ảnh JPG, JPEG, PNG</span>
      </div>

      <div class="flex flex-col gap-3 mt-6 border-b border-[#eee] pb-2">
        <label class="font-semibold">Background</label>
        <div class="background" />
        <span class="text-xs">Ảnh JPG, JPEG, PNG</span>
      </div>

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

const isEdit = ref(false);

const handlerClickEdit = () => {
  isEdit.value = !isEdit.value;
};

const handleSubmit = () => {
  console.log("vod ay");
};
</script>

<style lang="css" scoped>
.background {
  background-image: url("https://cdn.pixabay.com/photo/2023/11/16/22/06/fritillary-butterfly-8393205_640.jpg");
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  padding-top: 33%;
  border-radius: 10px;
}
</style>
