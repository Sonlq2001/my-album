export const SORT_VALUE = {
  CREATED_DESC: "-createdAt",
  CREATED_ASC: "createdAt",
};

export const LIST_SORT_CATEGORIES = [
  {
    label: "Mới nhất",
    value: SORT_VALUE.CREATED_DESC,
  },
  {
    label: "Lâu nhất",
    value: SORT_VALUE.CREATED_ASC,
  },
];
