<template>
  <div class="flex flex-col gap-3 mt-6 border-b border-[#eee] pb-2">
    <label class="font-semibold">Avatar</label>

    <div v-if="isEdit">
      <label
        class="w-[150px] h-[150px] max-sm:w-[130px] max-sm:h-[130px] rounded-full flex justify-center items-center bg-black/5"
      >
        <input hidden type="file" name="avatar" @change="handleChangeFile" />
        <img
          v-if="imageBackground"
          :src="imageBackground"
          alt="avatar"
          class="w-[150px] h-[150px] max-sm:w-[130px] max-sm:h-[130px] rounded-full"
        />

        <div v-else>
          <div class="flex flex-col justify-center items-center text-text_gray">
            <i class="ri-upload-2-line text-2xl"></i>
            <span class="text-[10px]">Ảnh JPG, JPEG, PNG</span>
          </div>
        </div>
      </label>

      <span v-if="errorMessage" class="text-sm text-red-500 inline-block mt-1">
        {{ errorMessage }}
      </span>
    </div>

    <img
      v-else-if="imageBackground"
      :src="imageBackground"
      alt="avatar"
      class="w-[150px] h-[150px] max-sm:w-[130px] max-sm:h-[130px] rounded-full"
    />

    <div v-else>Chưa có ảnh đại diện</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useField } from "vee-validate";

const { setFieldValue, avatar } = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  setFieldValue: {
    type: Function,
  },
  avatar: {
    type: String,
    default: "",
  },
});

const { errorMessage } = useField("avatar");
const fileAvatar = ref(null);

const imageBackground = computed(() => {
  return fileAvatar.value ? URL.createObjectURL(fileAvatar.value) : avatar;
});

const handleChangeFile = (e) => {
  const file = e.target.files[0];
  if (file) {
    fileAvatar.value = file;
    setFieldValue("avatar", file);
  }
};
</script>

<style lang="css" scoped></style>
