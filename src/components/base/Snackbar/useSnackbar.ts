import { OptionsObject, SnackbarKey, useSnackbar } from "notistack";
import { ReactNode } from "react";

export type EnqueueFn = (
  // eslint-disable-next-line no-unused-vars
  message: string | ReactNode,
  // eslint-disable-next-line no-unused-vars
  options?: OptionsObject
) => SnackbarKey;

const useSnackbarHook = () => {
  const { enqueueSnackbar: _enqueueSnackbar, closeSnackbar } = useSnackbar();

  const enqueueSnackbar: EnqueueFn = (message, options = {}) => {
    return _enqueueSnackbar(message, options);
  };

  const enqueueSuccess: EnqueueFn = (message, options = {}) => {
    return enqueueSnackbar(message, { variant: "success", ...options });
  };

  const enqueueInfo: EnqueueFn = (message, options = {}) => {
    return enqueueSnackbar(message, { variant: "info", ...options });
  };

  const enqueueWarning: EnqueueFn = (message, options = {}) => {
    return enqueueSnackbar(message, { variant: "warning", ...options });
  };

  const enqueueError: EnqueueFn = (message, options = {}) => {
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
