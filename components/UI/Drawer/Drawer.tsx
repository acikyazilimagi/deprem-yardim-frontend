import { useMapClickHandlers } from "@/hooks/useMapClickHandlers";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useDrawerData, useIsDrawerOpen } from "@/stores/mapStore";
import {
  CopyAll,
  DriveEta,
  OpenInNew,
  Google,
  Apple,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Snackbar, Switch, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { default as MuiDrawer } from "@mui/material/Drawer";
import formatcoords from "formatcoords";
import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./Drawer.module.css";
import { useRouter } from "next/router";

import Alert from "@mui/material/Alert";
import RenderIf from "../Common/RenderIf";
import { ExtraParameters } from "@/mocks/types";
interface MapsButton {
  label: string;
  // eslint-disable-next-line no-unused-vars
  urlCallback: (lat: number, lng: number) => void;
  icon: React.ReactNode;
  color: "primary" | "secondary" | "inherit";
}

export const generateGoogleMapsUrl = (lat: number, lng: number) => {
  return `https://www.google.com/maps/@${lat},${lng},22z`;
};

export const generateAppleMapsUrl = (lat: number, lng: number) => {
  return `http://maps.apple.com/?ll=${lat},${lng}&z=18`;
};

export const openGoogleMapsUrl = (lat: number, lng: number) => {
  window.open(generateGoogleMapsUrl(lat, lng), "_blank");
};

export const openAppleMapsUrl = (lat: number, lng: number) => {
  window.open(generateAppleMapsUrl(lat, lng), "_blank");
};

export const openGoogleMapsDirectionUrl = (lat: number, lng: number) => {
  window.open(
    `https://www.google.com/maps?saddr=My+Location&daddr=${lat},${lng}`,
    "_blank"
  );
};

export const mapsButtons: MapsButton[] = [
  {
    label: "Google Haritalarda Aç",
    urlCallback: openGoogleMapsUrl,
    icon: <Google className={styles.btnIcon} />,
    color: "primary",
  },
  {
    label: "Apple Haritalarda Aç",
    urlCallback: openAppleMapsUrl,
    icon: <Apple className={styles.btnIcon} />,
    color: "inherit",
  },
  {
    label: "Yol Tarifi Al",
    urlCallback: openGoogleMapsDirectionUrl,
    icon: <DriveEta className={styles.btnIcon} />,
    color: "secondary",
  },
];

const Drawer = () => {
  const isOpen = useIsDrawerOpen();
  const data = useDrawerData();
  const size = useWindowSize();
  const [error, setError] = useState(false);

  const [openBillboardSnackbar, setOpenBillboardSnackbar] = useState(false);

  const anchor = useMemo(
    () => (size.width > 768 ? "left" : "bottom"),
    [size.width]
  );
  //it's true as default so there is no extra_parameters no process needed
  const [showSavedData, setShowSavedData] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const onWheelTrigger = (e: WheelEvent) => {
        if (e.ctrlKey) {
          e.preventDefault();
        }
      };
      const onTouchMove = (e: any) => {
        if (e.scale !== 1) {
          e.preventDefault();
        }
      };
      window.addEventListener("wheel", onWheelTrigger, { passive: false });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      return () => {
        window.removeEventListener("wheel", onWheelTrigger);
        window.removeEventListener("touchmove", onTouchMove);
      };
    }
  }, [isOpen]);

  function copyBillboard(url: string) {
    navigator.clipboard.writeText(url);
    setOpenBillboardSnackbar(true);
  }

  const { handleMarkerClick: toggler } = useMapClickHandlers();
  const router = useRouter();
  const list = useMemo(() => {
    if (!data) {
      return null;
    }

    const { geometry, formatted_address, source } = data;

    let extraParams: undefined | ExtraParameters;

    try {
      extraParams = JSON.parse(source.extra_parameters || "undefined");
    } catch {
      //
    }
    const formattedCoordinates = formatcoords([
      geometry.location.lat,
      geometry.location.lng,
    ]).format();

    const openSourceUrl = () => {
      if (source.channel === "twitter" && !!extraParams) {
        if (extraParams.user_id && extraParams.tweet_id) {
          router.push(
            `https://twitter.com/${extraParams.user_id}/status/${extraParams.tweet_id}`
          );
        }
        return;
      }
      setError(true);
    };

    return (
      <Box
        sx={{
          width: size.width > 768 ? 400 : "full",
          display: "flex",
          height: "100%",
          padding: "1rem 2rem 1rem 1rem",
          flexDirection: "column",
          overflow: "hidden",
        }}
        role="presentation"
        onKeyDown={(e) => toggler(e)}
      >
        <div className={styles.content}>
          <h3 style={{ maxWidth: "45ch" }}>{formatted_address}</h3>
          <p>{formattedCoordinates}</p>
          <div className={styles.contentButtons}>
            {mapsButtons.map((button) => (
              <Button
                key={button.label}
                variant="contained"
                onClick={() => {
                  button.urlCallback(
                    geometry.location.lat,
                    geometry.location.lng
                  );
                }}
                color={button.color}
                className={styles.externalLinkButton}
                startIcon={button.icon}
              >
                {button.label}
              </Button>
            ))}
          </div>
          <div>
            <TextField
              fullWidth
              variant="standard"
              size="small"
              value={generateGoogleMapsUrl(
                geometry.location.lat,
                geometry.location.lng
              )}
              InputProps={{
                readOnly: true,
              }}
            />
            <div className={styles.actionButtons}>
              <Button
                variant="outlined"
                className={styles.clipboard}
                size="small"
                fullWidth
                onClick={() =>
                  copyBillboard(
                    `https://www.google.com/maps/@${geometry.location.lat.toString()},${geometry.location.lng.toString()},22z`
                  )
                }
                startIcon={<CopyAll className={styles.btnIcon} />}
              >
                Kopyala
              </Button>
              <Button
                variant="outlined"
                className={styles.clipboard}
                fullWidth
                size="small"
                onClick={openSourceUrl}
                startIcon={<OpenInNew className={styles.btnIcon} />}
                color="secondary"
              >
                Kaynak
              </Button>
            </div>
          </div>
          <div className={styles.sourceContent}>
            <div className={styles.sourceHelpContent}>
              <Typography className={styles.sourceContentTitle}>
                Yardım İçeriği
              </Typography>
              <RenderIf condition={!!extraParams}>
                <div className={styles.sourceContentSwitch}>
                  <p>Kayıtlı veriyi göster</p>
                  <Switch
                    checked={showSavedData}
                    onChange={() => setShowSavedData((s) => !s)}
                  />
                </div>
              </RenderIf>
            </div>
            <RenderIf condition={showSavedData || !extraParams}>
              <div className={styles.sourceContentText}>
                <Typography>{source?.full_text}</Typography>
              </div>
            </RenderIf>
            <RenderIf condition={!showSavedData && !!extraParams}>
              <div className={styles.sourceContentIframeWrapper}>
                <iframe
                  className={styles.sourceContentIframe}
                  width={"100%"}
                  style={{ border: 0 }}
                  src={`https://twitframe.com/show?url=https://twitter.com/${extraParams?.user_id}/status/${extraParams?.tweet_id}&conversation=none`}
                ></iframe>
              </div>
            </RenderIf>
          </div>
        </div>
        <CloseIcon onClick={(e) => toggler(e)} className={styles.closeButton} />
      </Box>
    );
  }, [data, size.width, showSavedData, toggler, router]);

  const handleClose = useCallback((e: MouseEvent) => toggler(e), [toggler]);

  return (
    <div>
      <Snackbar
        open={openBillboardSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenBillboardSnackbar(false)}
        message="Adres Kopyalandı"
      />

      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ zIndex: 10000 }}
      >
        <Alert
          action={
            <CloseIcon
              onClick={() => setError(false)}
              style={{
                width: 20,
                cursor: "pointer",
                margin: "auto",
              }}
            />
          }
          severity="error"
        >
          Kaynak açılamadı
        </Alert>
      </Snackbar>
      <MuiDrawer
        className="drawer"
        anchor={anchor}
        open={isOpen}
        onClose={handleClose}
      >
        {list}
      </MuiDrawer>
    </div>
  );
};

export default React.memo(Drawer);
