import { ReactNode } from "react";
import { SnackbarProvider as NotiSnackBar } from "notistack";
import { SnackbarCloseButton } from "./SnackbarCloseButton";

export const SnackbarProvider = (props: { children: ReactNode }) => {
  return (
    <NotiSnackBar
      maxSnack={3}
      action={(key) => <SnackbarCloseButton key={key} />}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      style={{
        whiteSpace: "pre-line",
        wordBreak: "break-word",
        textAlign: "center",
        top: "60px;",
        minWidth: "150px",
        width: "100%",
      }}
      preventDuplicate
      variant="default"
      dense
      {...props}
    >
      {props.children}
    </NotiSnackBar>
  );
};
