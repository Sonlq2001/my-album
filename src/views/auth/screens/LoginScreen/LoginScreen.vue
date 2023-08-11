<template>
  <div class="h-[100vh] w-full overflow-hidden relative login-screen">
    <div class="columns-5 gap-4 absolute top-0 left-0 right-0 bottom-0">
      <img
        v-for="(itemImage, index) in LIST_DATA"
        :src="itemImage.image"
        :key="index"
        :alt="'bg-' + index"
        class="mb-4"
      />
    </div>

    <div
      class="absolute z-10 max-w-[460px] w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-9"
    >
      <h1 class="font-extrabold text-2xl">Login MyAlbum</h1>
      <div class="flex items-center mt-2 gap-2">
        <p class="text-sm text-text_gray">Thế giới ảnh của bạn</p>
        <i class="ri-pulse-fill leading-[0px] text-xl wave" />
      </div>

      <form action="" class="mt-8">
        <div class="mb-5">
          <label for="" class="block text-text_gray">Email</label>
          <input
            type="text"
            placeholder="Email"
            class="outline-none w-full mt-2 border rounded-md p-3 border-[#ddd]"
          />
        </div>
        <div class="mb-5">
          <label for="" class="block text-text_gray">Password</label>
          <input
            type="password"
            placeholder="Password"
            class="outline-none w-full mt-2 border rounded-md p-3 border-[#ddd]"
          />
        </div>
        <div class="text-right mt-10">
          <button class="px-4 py-2 bg-main text-white hover:bg-sub rounded">
            Login
          </button>
        </div>
        <div class="text-right mt-5">
          <router-link to="/" class="text-sm text-text_gray">
            Đăng ký ?
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { LIST_DATA } from "../../constants/auth.constants";
</script>

<style lang="css" scoped>
.login-screen::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}
.wave {
  animation: WaveFlicker 1s infinite linear;
}

@keyframes WaveFlicker {
  from {
    color: black;
  }
  to {
    color: #00ab6b;
    font-weight: 700;
  }
}
</style>
