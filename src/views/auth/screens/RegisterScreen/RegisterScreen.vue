<template>
  <div
    class="absolute z-10 max-w-[400px] w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-9"
  >
    <h1 class="font-extrabold text-2xl">Đăng ký tài khoản</h1>
    <caption-auth />

    <form-vee
      @submit="handleSubmit"
      class="mt-8"
      :validation-schema="schemaRegister"
      :initial-values="initialRegisterValue"
    >
      <div class="mb-5">
        <input-field name="name" placeholder="Nguyen Van A" label="Họ tên" />
      </div>
      <div class="mb-5">
        <input-field
          name="email"
          placeholder="my_album@gmail.com"
          label="Email"
        />
      </div>
      <div class="mb-5">
        <input-field
          name="password"
          placeholder="Mật khẩu"
          label="Mật khẩu"
          type="password"
        />
      </div>
      <div class="mb-5">
        <input-field
          name="passwordConfirm"
          placeholder="Nhập lại mật khẩu"
          label="Nhập lại mật khẩu"
          type="password"
        />
      </div>
      <div class="text-right mt-10">
        <button class="px-4 py-2 bg-main text-white hover:bg-sub rounded">
          Đăng ký
        </button>
      </div>
      <div class="text-right mt-5">
        <router-link
          :to="{ name: NamespaceRouter.LOGIN }"
          class="text-sm text-text_gray"
        >
          Đăng nhập ?
        </router-link>
      </div>
    </form-vee>
  </div>
</template>

<script setup>
import { Form as FormVee } from "vee-validate";

import CaptionAuth from "../../components/CaptionAuth/CaptionAuth.vue";
import InputField from "@/components/Form/InputField/InputField.vue";
import { NamespaceRouter } from "@/constants/router.constants";
import {
  schemaRegister,
  initialRegisterValue,
} from "../../helpers/auth.helper";

const handleSubmit = (values) => {
  console.log(values);

  // TODO: register
};
</script>

<style lang="scss" scoped></style>
