import { object, string } from "yup";

import {
  MIN_PASSWORD,
  MAX_PASSWORD,
  MAX_NAME,
} from "../constants/auth.constants";

export const schemaLogin = object().shape({
  email: string()
    .required("Bạn chưa nhập email !")
    .email("Địa chỉ email không hợp lệ !"),
  password: string()
    .required("Bạn chưa nhập mật khẩu !")
    .min(MIN_PASSWORD, `Mật khẩu tối thiểu ${MIN_PASSWORD} ký tự !`)
    .max(MAX_PASSWORD, `Mật khẩu tối đa ${MAX_PASSWORD} ký tự`),
});

export const initialLoginValue = {
  email: "",
  password: "",
};

export const initialRegisterValue = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export const schemaRegister = object().shape({
  name: string()
    .required("Bạn chưa nhập họ tên !")
    .max(MAX_NAME, `Độ dài họ tên tối đa ${MAX_NAME} ký tự !`),
  email: string()
    .required("Bạn chưa nhập email !")
    .email("Địa chỉ email không hợp lệ !"),
  password: string()
    .required("Bạn chưa nhập mật khẩu !")
    .min(MIN_PASSWORD, `Mật khẩu tối thiểu ${MIN_PASSWORD} ký tự !`)
    .max(MAX_PASSWORD, `Mật khẩu tối đa ${MAX_PASSWORD} ký tự !`),
  passwordConfirm: string()
    .required("Bạn chưa nhập lại mật khẩu !")
    .test("password", "Mật khẩu không khớp !", function (value) {
      return this.parent.password === value;
    }),
});
