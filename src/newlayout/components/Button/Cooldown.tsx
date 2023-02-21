import { useLoading } from "@/stores/loadingStore";
import { shallowEqual } from "@/utils/helpers";
import { Button, LinearProgress, SxProps, Theme } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import { mutate } from "swr";

interface IStyles {
  [key: string]: SxProps<Theme>;
}

export const CooldownButtonComponent = () => {
  const { t } = useTranslation("home");
  const router = useRouter();
  const { loading } = useLoading();
  const [queryParams, setQueryParams] = useState<{
    [key: string]: string | string[] | undefined;
  }>({ ...router.query });
  const isSameParams = shallowEqual(router.query, queryParams);

  const refetch = () => {
    setQueryParams({ ...router.query });
    mutate((key) => Array.isArray(key) && key[0] == "areas");
  };

  return (
    <Button
      sx={styles.button}
      variant="contained"
      onClick={refetch}
      disabled={isSameParams}
    >
      {t("scanner.text")}
      {loading ? <LinearProgress sx={styles.progress} /> : null}
    </Button>
  );
};

const styles: IStyles = {
  button: () => ({
    pointerEvents: "all",
    height: "48px",
    width: "200px",
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
