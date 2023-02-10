import { SnackbarProvider } from "notistack";
import { ComponentProps, ReactNode } from "react";

const Snackbar = (
  props: {
    children: ReactNode;
  } & ComponentProps<typeof SnackbarProvider>
) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      style={{
        whiteSpace: "pre-line",
        wordBreak: "break-word",
        textAlign: "center",
        top: "60px;",
        minWidth: "150px",
        width: "100%",
      }}
      variant="default"
      dense
      {...props}
    >
      {props.children}
    </SnackbarProvider>
  );
};

export default Snackbar;
