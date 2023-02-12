import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";
import SnackbarCloseButton from "./SnackbarCloseButton";

const Snackbar = (props: { children: ReactNode }) => {
  return (
    <SnackbarProvider
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
    </SnackbarProvider>
  );
};

export default Snackbar;
