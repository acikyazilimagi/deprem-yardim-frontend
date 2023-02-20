//#region imports
import { Button, LinearProgress, SxProps, Theme } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "next-i18next";
import { ApiClient } from "../../../services/ApiClient";
import { ChannelData } from "@/types";
import { useMap } from "react-leaflet";
import { useRouter } from "next/router";
import { getFetchAreaBound } from "@/utils/fetchArea";

//#endregion
//#region interfaces
interface IStyles {
  [key: string]: SxProps<Theme>;
}
//#endregion
//#region store

//#endregion
//#region component
type Props = {
  apiClient: ApiClient;
  setLocations: Dispatch<SetStateAction<ChannelData[]>>;
};

export const CooldownButtonComponent = ({ apiClient, setLocations }: Props) => {
  const { t } = useTranslation("home");
  const TICKER = 1000;
  const COOLDOWN = 30000;
  const [cooldown, setCooldown] = useState(false);
  const [progress, setProgress] = useState(100);

  const map = useMap();
  const router = useRouter();
  const onScanClick = () => {
    const reasons = router.query.reasons as string;
    const bound = getFetchAreaBound(map.getBounds());
    apiClient.fetchAreas({ reasons, bound }).then(setLocations);
  };

  const handleClick = () => {
    setCooldown(true);
    setProgress(0);
    let _tick = 0;
    const timer = setInterval(() => {
      _tick = _tick + TICKER;
      const _progress = (_tick / COOLDOWN) * 100;
      setProgress(_progress);
    }, TICKER);
    setTimeout(() => {
      setCooldown(false);
      clearInterval(timer);
      setProgress(100);
    }, COOLDOWN);
    onScanClick();
  };
  return (
    <>
      <Button
        sx={styles.button}
        variant="contained"
        onClick={handleClick}
        disabled={cooldown}
      >
        {t("scanner.text")}
        {cooldown ? (
          <LinearProgress
            variant="determinate"
            color={cooldown ? "inherit" : "primary"}
            value={progress}
            sx={styles.progress}
          />
        ) : null}
      </Button>
    </>
  );
};
//#endregion
//#region styles
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
//#endregion
