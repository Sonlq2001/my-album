<template>
  <div
    class="absolute z-10 max-w-[400px] w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-9"
  >
    <h1 class="font-extrabold text-2xl">Đăng nhập MyAlbum</h1>
    <caption-auth />

    <span
      v-if="isRegisterSuccess"
      class="inline-block mt-4 bg-success rounded-md text-white p-2 text-sm"
    >
      Đăng ký tài khoản thành công !
    </span>

    <form-vee
      @submit="handleSubmit"
      :class="isRegisterSuccess ? 'mt-5' : 'mt-8'"
      :validation-schema="schemaLogin"
      :initial-values="initialLoginValue"
    >
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
      <div class="flex justify-end mt-10">
        <app-button :disabled="isPendingLogin" intent="primary">
          Đăng nhập
        </app-button>
      </div>
      <div class="text-right mt-5">
        <router-link
          :to="{ name: NamespaceRouter.REGISTER }"
          class="text-sm text-text_gray"
        >
          Đăng ký ?
        </router-link>
      </div>
    </form-vee>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form as FormVee } from "vee-validate";
import { useRouter } from "vue-router";

import InputField from "@/components/Form/InputField/InputField.vue";
import AppButton from "@/components/AppButton/AppButton.vue";
import { schemaLogin, initialLoginValue } from "../../helpers/auth.helper";
import { useAuthStore } from "@/stores/auth/auth.store";
import { NamespaceRouter } from "@/constants/router.constants";
import CaptionAuth from "../../components/CaptionAuth/CaptionAuth.vue";

const { login, isRegisterSuccess } = useAuthStore();
const router = useRouter();

const isPendingLogin = ref(false);

const handleSubmit = (values) => {
  isPendingLogin.value = true;
  login(values)
    .then(() => {
      router.push({ name: NamespaceRouter.HOME });
    })
    .finally(() => {
      isPendingLogin.value = false;
    });
};
</script>

<style lang="css" scoped></style>
