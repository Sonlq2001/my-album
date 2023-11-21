import { HomePaths } from "@/views/home/home";

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getQueryStringUrl = (key) => {
  return new URLSearchParams(window.location.search).get(key) || "";
};

export const pushQueryString = (params = {}) => {
  if ([HomePaths.ROOT].includes(window.location.pathname)) return;

  let filterParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v)
  );

  const str = Object.keys(filterParams)
    .map((key) => {
      return `${key}=${encodeURIComponent(filterParams[key])}`;
    })
    .join("&");
  const queryString = str ? `?${str}` : "";

  window.history.replaceState(history.state, "", queryString);
};
