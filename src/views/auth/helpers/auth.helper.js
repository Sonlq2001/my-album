import { object, string } from "yup";

import { MIN_PASSWORD, MAX_PASSWORD } from "../constants/auth.constants";

export const schemaLogin = object().shape({
  email: string()
    .required("Bạn chưa nhập email !")
    .email("Địa chỉ email không hợp lệ !"),
  password: string()
    .required("Bạn chưa nhập mật khẩu !")
    .min(MIN_PASSWORD, `Mật khẩu tối thiểu ${MIN_PASSWORD} ký tự !`)
    .max(MAX_PASSWORD, `Mật khẩu tối đa ${MAX_PASSWORD} ký tự`),
});
