export const MAX_TITLE = 50;
export const MIN_IMAGE = 1;
export const MAX_IMAGE = 10;

export const FILES_ACCEPT = ["image/jpg", "image/jpeg", "image/png"];

export const STATUS_ALBUM = {
  PUBLIC: 0,
  PRIVATE: 1,
};

export const LIST_CATEGORY_ALBUMS = [
  {
    id: 1,
    label: "Con người",
  },
  {
    id: 2,
    label: "Cuộc sống",
  },
  {
    id: 3,
    label: "Thiên nhiên",
  },
];

export const STATUS_OPTIONS_ALBUM = [
  {
    label: "Công khai",
    value: STATUS_ALBUM.PUBLIC,
  },
  {
    label: "Riêng tư",
    value: STATUS_ALBUM.PRIVATE,
  },
];
