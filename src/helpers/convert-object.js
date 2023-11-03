import camelCase from "lodash.camelcase";
import snakeCase from "lodash.snakecase";

// check if data is array
export const isArray = (d) => Array.isArray(d);

// check if data is object
export const isObject = (d) =>
  d === Object(d) && !isArray(d) && typeof d !== "function";

// convert object keys to camelCase
export const toCamel = function (d) {
  if (isObject(d)) {
    const o = {};
    Object.keys(d).forEach((k) => {
      o[camelCase(k)] = toCamel(d[k]);
    });

    return o;
  }

  if (isArray(d)) {
    return d.map((o) => toCamel(o));
  }

  return d;
};

// convert object keys to snake_case
export const toSnakeCase = function (d, filter = false) {
  if (d instanceof FormData) {
    return d;
  }

  if (isObject(d)) {
    const o = {};
    Object.keys(d).forEach((k) => {
      o[snakeCase(k)] = toSnakeCase(d[k], filter);
    });

    return o;
  }

  if (isArray(d)) {
    return d.map((o) => toSnakeCase(o, filter));
  }

  if (filter && d === "") {
    return null;
  }

  return d;
};
