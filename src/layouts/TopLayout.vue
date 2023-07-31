<template>
  <div id="top-layout">
    <div class="relative min-h-[500px]">
      <div class="bg-main absolute top-0 left-0 w-full h-full overflow-hidden">
        <picture>
          <source
            media="(min-width: 1440px)"
            srcset="
              https://cdn.pixabay.com/photo/2023/06/04/11/42/river-8039447_640.jpg
            "
          />
          <source
            media="(max-width: 640px)"
            srcset="
              https://cdn.pixabay.com/photo/2023/06/04/11/42/river-8039447_640.jpg
            "
          />
          <img
            src="https://cdn.pixabay.com/photo/2023/06/04/11/42/river-8039447_640.jpg"
            alt="bg-main"
            class="min-w-[1000%] min-h-[1000%] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 object-cover scale-[0.1]"
          />
        </picture>
      </div>
      <div
        class="absolute left-0 right-0 bottom-0 top-0 max-w-[1830px] mx-auto px-8"
      >
        <Header isHome />
        <search-top />
      </div>
    </div>
    <slot />

    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/Header/Header.vue";
import SearchTop from "@/components/SearchTop/SearchTop.vue";
import Footer from "@/components/footer/footer.vue";
</script>

<style lang="css" scoped>
.bg-main::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}
</style>
