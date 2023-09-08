import get from "lodash.get";

export const getErrorMessage = (error, touched) => {
  return {
    isError: error && touched,
    message: error,
  };
};
