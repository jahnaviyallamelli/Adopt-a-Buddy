import { HIDE_SNACKBAR, SHOW_SNACKBAR } from "../actionTypes/snackebar";

export const showSnackbar = (payload) => ({
  type: SHOW_SNACKBAR,
  payload,
});

export const hideSnackbar = () => ({
  type: HIDE_SNACKBAR,
});
