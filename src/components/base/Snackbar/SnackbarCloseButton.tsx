import Close from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { SnackbarKey } from "notistack";
import React, { useCallback } from "react";
import useSnackbarHook from "./useSnackbar";

type SnackbarCloseButtonProps = {
  key: SnackbarKey;
};

const SnackbarCloseButton: React.FC<SnackbarCloseButtonProps> = ({ key }) => {
  const { closeSnackbar } = useSnackbarHook();

  const handleClick = useCallback(() => {
    closeSnackbar(key);
  }, [closeSnackbar, key]);

  return (
    <IconButton size={"medium"} onClick={handleClick}>
      <Close
        style={{
          color: "white",
        }}
      />
    </IconButton>
  );
};

export default SnackbarCloseButton;
