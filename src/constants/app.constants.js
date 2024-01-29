export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 20;
export const DEFAULT_PER_PAGE_HOME = 30;
export const DEFAULT_PER_PAGE_RELATED = 10;

export const FILES_ACCEPT = ["image/jpg", "image/jpeg", "image/png"];

export const SORT_VALUE = {
  CREATED_DESC: "-createdAt",
  CREATED_ASC: "createdAt",
  ALBUM_PUBLIC: "public",
  ALBUM_PRIVATE: "private",
};

export const LIST_SORT = [
  {
    label: "Mới nhất",
    value: SORT_VALUE.CREATED_DESC,
  },
  {
    label: "Lâu nhất",
    value: SORT_VALUE.CREATED_ASC,
  },
];
