<template>
  <div class="flex justify-center items-center h-full">
    <div class="z-10 max-w-[400px] w-full bg-white rounded-xl p-9 mx-6">
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
        <div class="flex justify-end mt-10">
          <app-button :disabled="isPendingRegister" intent="primary">
            Đăng ký
          </app-button>
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form as FormVee } from "vee-validate";
import { useRouter } from "vue-router";

import CaptionAuth from "../../components/CaptionAuth/CaptionAuth.vue";
import InputField from "@/components/Form/InputField/InputField.vue";
import AppButton from "@/components/AppButton/AppButton.vue";

import { NamespaceRouter } from "@/constants/router.constants";
import { useAuthStore } from "@/stores/auth/auth.store";
import {
  schemaRegister,
  initialRegisterValue,
} from "../../helpers/auth.helper";

const { register } = useAuthStore();
const router = useRouter();

const isPendingRegister = ref(false);

const handleSubmit = (values) => {
  isPendingRegister.value = true;
  register({ ...values, passwordConfirm: undefined })
    .then(() => {
      router.push({ name: NamespaceRouter.LOGIN });
    })
    .finally(() => {
      isPendingRegister.value = false;
    });
};
</script>

<style lang="scss" scoped></style>
