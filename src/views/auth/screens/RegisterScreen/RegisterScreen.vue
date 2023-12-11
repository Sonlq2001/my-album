<template>
  <div class="flex justify-center items-center h-full">
    <div class="z-10 max-w-[400px] w-full bg-white rounded-xl p-9 mx-6">
      <h1 class="font-extrabold text-2xl">Đăng ký tài khoản</h1>

      <caption-auth />

      <div class="flex items-center justify-center my-6 gap-[5px]">
        <span
          :class="[
            'w-[10px] h-[10px] block  rounded-full cursor-pointer',
            tab === currentTab ? 'bg-main' : 'bg-[#eee]',
          ]"
          v-for="(tab, index) in Object.values(TAB_REGISTER)"
          :key="index"
          @click="() => handleChangeTab(tab)"
        />
      </div>

      <form-vee
        @submit="handleSubmit"
        :validation-schema="schemaRegister"
        :initial-values="initialRegisterValue"
        @invalid-submit="handleSubmitForm"
      >
        <tab-info v-if="TAB_REGISTER.INFO === currentTab" />

        <tab-auth v-else />

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

import AppButton from "@/components/AppButton/AppButton.vue";
import { NamespaceRouter } from "@/constants/router.constants";
import { useAuthStore } from "@/stores/auth/auth.store";

import TabInfo from "../../components/TabInfo/TabInfo.vue";
import TabAuth from "../../components/TabAuth/TabAuth.vue";
import CaptionAuth from "../../components/CaptionAuth/CaptionAuth.vue";
import {
  schemaRegister,
  initialRegisterValue,
} from "../../helpers/auth.helper";
import { TAB_REGISTER } from "../../constants/auth.constants";

const { register } = useAuthStore();
const router = useRouter();

const isPendingRegister = ref(false);
const currentTab = ref(TAB_REGISTER.INFO);

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

const handleChangeTab = (tab) => {
  currentTab.value = tab;
};

const handleSubmitForm = ({ _, errors }) => {
  currentTab.value =
    errors["name"] || errors["email"] ? TAB_REGISTER.INFO : TAB_REGISTER.AUTH;
};
</script>

<style lang="scss" scoped></style>
