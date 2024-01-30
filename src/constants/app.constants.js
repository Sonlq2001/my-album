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

export const IMAGES_TOP = [
  {
    image:
      "https://cdn.pixabay.com/photo/2024/01/19/13/27/fog-8519076_1280.jpg",
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2024/01/18/17/37/stalk-8517287_1280.jpg",
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2023/09/29/10/20/sunset-8283538_1280.jpg",
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2023/10/28/23/36/dahlias-8348462_1280.jpg",
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2023/12/30/17/39/green-lily-8478514_1280.jpg",
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2016/12/03/15/44/fireworks-1880045_1280.jpg",
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2023/10/23/14/22/trees-8336189_1280.jpg",
  },
];

export const TIME_KEY = "time";
export const BACKGROUND_KEY = "background";
export const ONE_HOURS = 60 * 60 * 1000; // 1 hours
