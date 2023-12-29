<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex justify-between overflow-hidden">
      <div
        class="bg-[#0f172a40] absolute inset-0 overlay"
        @click="handleCloseModal"
      />
      <div class="mt-[80px] absolute flex justify-center mx-6 left-0 right-0">
        <div class="relative max-w-[570px] w-full input-search">
          <i
            class="absolute top-1/2 -translate-y-1/2 ri-search-line text-[20px] left-[14px]"
          />
          <input
            type="text"
            class="w-full rounded-2xl outline-none py-4 pl-[48px] pr-4"
            placeholder="Tìm kiếm tất cả hình ảnh của bạn"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const emits = defineEmits(["close-modal"]);

const handleCloseModal = () => {
  emits("close-modal");
};
</script>

<style lang="css" scoped>
.input-search {
  animation: AnimationModalSearch 0.3s ease-in-out;
}

@keyframes AnimationModalSearch {
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
}

@keyframes FadeSearch {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.overlay {
  backdrop-filter: blur(8px);
  animation: FadeSearch 0.3s 1;
}
</style>
