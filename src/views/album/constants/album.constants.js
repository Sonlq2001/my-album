export const MAX_TITLE = 50;
export const MIN_IMAGE = 1;
export const MAX_IMAGE = 10;

export const KEY_STATUS_ALBUM = {
  public: "public",
  private: "private",
};

export const STATUS_ALBUM = {
  [KEY_STATUS_ALBUM.public]: 0,
  [KEY_STATUS_ALBUM.private]: 1,
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
    value: STATUS_ALBUM[KEY_STATUS_ALBUM.public],
  },
  {
    label: "Riêng tư",
    value: STATUS_ALBUM[KEY_STATUS_ALBUM.private],
  },
];
