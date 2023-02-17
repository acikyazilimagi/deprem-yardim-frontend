//#region imports
import { Button, LinearProgress, SxProps, Theme } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "next-i18next";

//#endregion
//#region interfaces
interface IStyles {
  [key: string]: SxProps<Theme>;
}
//#endregion
//#region store

//#endregion
//#region component
export const CooldownButtonComponent = () => {
  const { t } = useTranslation("home");
  const TICKER = 1000;
  const COOLDOWN = 30000;
  const [cooldown, setCooldown] = useState(false);
  const [progress, setProgress] = useState(100);
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
