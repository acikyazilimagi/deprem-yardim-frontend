import { Button, SxProps, Theme } from "@mui/material";
import { useTranslation } from "next-i18next";
import { mutate } from "swr";

interface IStyles {
  [key: string]: SxProps<Theme>;
}

export const CooldownButtonComponent = () => {
  const { t } = useTranslation("home");

  const refetch = () =>
    mutate((key) => Array.isArray(key) && key[0] == "areas");

  return (
    <Button sx={styles.button} variant="contained" onClick={refetch}>
      {t("scanner.text")}
    </Button>
  );
};

const styles: IStyles = {
  button: () => ({
    pointerEvents: "all",
    height: "48px",
    width: "225px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px !important",
  }),
  progress: () => ({
    height: "4px",
    width: "100%",
    marginTop: 0.5,
    marginBottom: 0,
  }),
};
