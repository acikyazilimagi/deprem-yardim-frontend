import { useLoading } from "@/stores/loadingStore";
import { useEventType } from "@/stores/mapStore";
import { EVENT_TYPES } from "@/types";
import { Button, LinearProgress, SxProps, Theme } from "@mui/material";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { mutate } from "swr";

interface IStyles {
  [key: string]: SxProps<Theme>;
}

const scanAreaWhiteList: Partial<EVENT_TYPES[]> = ["moveend", "zoomend"];

export const CooldownButtonComponent = () => {
  const { t } = useTranslation("home");
  const { loading } = useLoading();
  const eventType = useEventType();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (!scanAreaWhiteList.includes(eventType)) return;

    setIsDisabled(false);
  }, [eventType]);

  const refetch = () => {
    setIsDisabled(true);
    mutate((key) => Array.isArray(key) && key[0] == "areas");
  };

  return (
    <Button
      sx={styles.button}
      variant="contained"
      onClick={refetch}
      disabled={isDisabled}
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
