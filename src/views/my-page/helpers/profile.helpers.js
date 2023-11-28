import { object, string, mixed } from "yup";

import { FILES_ACCEPT } from "@/constants/app.constants";

import { MAX_NAME, MAX_PASSWORD } from "../constants/profile.constants";

export const schemaUpdateProfile = object().shape({
  name: string()
    .required("Bạn chưa nhập họ tên !")
    .max(MAX_NAME, `Tiêu đề tối đa ${MAX_NAME} ký tự !`),
  avatar: mixed()
    .test("avatar", "Định dạng file ảnh không được hỗ trợ !", (file) => {
      if (file) {
        return FILES_ACCEPT.includes(file.type);
      }
      return true;
    })
    .nullable()
    .test("avatar", "Kích thước file ảnh vượt quá 2mb", (file) => {
      if (file) {
        return file.size / (1024 * 1024) < 2;
      }
      return true;
    }),
  background: mixed()
    .test("background", "Định dạng file ảnh không được hỗ trợ !", (file) => {
      if (file) {
        return FILES_ACCEPT.includes(file.type);
      }
      return true;
    })
    .nullable()
    .test("background", "Kích thước file ảnh vượt quá 2mb", (file) => {
      if (file) {
        return file.size / (1024 * 1024) < 2;
      }
      return true;
    }),
  password: string()
    .required("Bạn chưa nhập mật khẩu !")
    .max(MAX_PASSWORD, `Mật khẩu tối đa ${MAX_PASSWORD} ký tự !`),
});

export const initValuesProfile = {
  name: "",
  password: "",
  avatar: "",
  background: "",
};
