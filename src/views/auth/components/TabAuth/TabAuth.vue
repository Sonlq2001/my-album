<template>
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
</template>

<script setup>
import InputField from "@/components/Form/InputField/InputField.vue";
</script>

<style lang="scss" scoped></style>
