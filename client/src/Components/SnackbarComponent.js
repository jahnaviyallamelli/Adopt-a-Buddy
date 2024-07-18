import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackbar } from "../redux/actions/snackebar";

const SnackbarComponent = () => {
  const dispatch = useDispatch();
  const { open, message, type } = useSelector((state) => state.snackbar);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => dispatch(hideSnackbar())}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={type} onClose={() => dispatch(hideSnackbar())}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
