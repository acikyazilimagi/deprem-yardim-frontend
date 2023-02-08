import React from "react";

import { useSnackbar } from "notistack";

const useSnackbarHook = () => {
  const { enqueueSnackbar: _enqueueSnackbar, closeSnackbar } = useSnackbar();

  const enqueueSnackbar = (message: string | React.ReactNode, options = {}) => {
    return _enqueueSnackbar(message, options);
  };

  const enqueueSuccess = (message: string | React.ReactNode, options = {}) => {
    return enqueueSnackbar(message, { variant: "success", ...options });
  };

  const enqueueInfo = (message: string | React.ReactNode, options = {}) => {
    return enqueueSnackbar(message, { variant: "info", ...options });
  };

  const enqueueWarning = (message: string | React.ReactNode, options = {}) => {
    return enqueueSnackbar(message, { variant: "warning", ...options });
  };

  const enqueueError = (message: string | React.ReactNode, options = {}) => {
    return enqueueSnackbar(message, { variant: "error", ...options });
  };

  return {
    enqueueSnackbar,
    enqueueSuccess,
    enqueueInfo,
    enqueueWarning,
    enqueueError,
    closeSnackbar,
  };
};
export default useSnackbarHook;
