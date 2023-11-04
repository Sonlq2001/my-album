<template>
  <div class="flex items-center mt-2 gap-2">
    <p class="text-sm text-text_gray">Thế giới ảnh của bạn</p>
    <i class="ri-pulse-fill leading-[0px] text-xl wave" />
  </div>
</template>

<script setup></script>

<style lang="css" scoped>
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
