import { object, string, array, mixed } from "yup";

import { FILES_ACCEPT } from "@/constants/app.constants";

import {
  MAX_TITLE,
  MIN_IMAGE,
  MAX_IMAGE,
  STATUS_ALBUM,
  KEY_STATUS_ALBUM,
} from "../constants/album.constants";

export const schemaCreateAlbum = object().shape({
  title: string()
    .required("Bạn chưa nhập tiêu đề file ảnh !")
    .max(MAX_TITLE, `Tiêu đề tối đa ${MAX_TITLE} ký tự !`),
  event_album: string().nullable(),
  albums: array()
    .of(
      mixed()
        .test("albums", "Định dạng file ảnh không được hỗ trợ !", (file) => {
          return FILES_ACCEPT.includes(file.type);
        })
        .test("albums", "Kích thước file ảnh vượt quá 2mb", (file) => {
          return file.size / (1024 * 1024) < 2;
        })
    )
    .min(MIN_IMAGE, "Cần chọn tối thiểu 1 file ảnh !")
    .max(MAX_IMAGE, "Chỉ được phép chọn 10 file ảnh !"),
  category: string().required("Bạn chưa chọn danh mục !"),
  date: string().required(),
  time: string().required(),
  story: string().required("Bạn chưa nhập câu chuyện của những tấm ảnh !"),
});

export const initValuesAlbum = {
  title: "",
  event_album: "",
  albums: [],
  category: "",
  story: "",
  date: "",
  time: "",
  status: STATUS_ALBUM[KEY_STATUS_ALBUM.public],
};
