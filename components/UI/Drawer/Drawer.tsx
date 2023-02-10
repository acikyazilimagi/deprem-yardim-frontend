import useDisableZoom from "@/hooks/useDisableZoom";
import { useMapClickHandlers } from "@/hooks/useMapClickHandlers";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Data } from "@/mocks/TypesAreasEndpoint";
import { dataFetcher } from "@/services/dataFetcher";
import { useDrawerData, useIsDrawerOpen } from "@/stores/mapStore";
import { dataTransformer } from "@/utils/dataTransformer";
import { locationsURL } from "@/utils/urls";
import {
  Apple,
  CopyAll,
  DriveEta,
  Google,
  OpenInNew,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  CircularProgress,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { default as MuiDrawer } from "@mui/material/Drawer";
import formatcoords from "formatcoords";
import React, { MouseEvent, useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import GenericError from "../GenericError/GenericError";
import styles from "./Drawer.module.css";
import { getTimeAgo } from "@/utils/date";
import dynamic from "next/dynamic";
import PlaceholderTweet from "./components/PlaceholderTweet";

interface MapsButton {
  label: string;
  // eslint-disable-next-line no-unused-vars
  urlCallback: (lat: number, lng: number) => void;
  icon: React.ReactNode;
  color: "primary" | "secondary" | "inherit";
}
const EmbedTweet = dynamic(() => import("./components/EmbedTweet"), {
  ssr: false,
});

export const generateGoogleMapsUrl = (lat: number, lng: number) => {
  return `https://www.google.com/maps/?q=${lat},${lng}&ll=${lat},${lng}&z=21`;
};

export const generateAppleMapsUrl = (lat: number, lng: number) => {
  return `http://maps.apple.com/?q=${lat},${lng}&ll=${lat},${lng}&z=18`;
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

export const generateTweetUrl = (tweetId: string) => {
  return `https://twitter.com/anyuser/status/${tweetId}`;
};

export const openTweetUrl = (tweetId: string) => {
  window.open(generateTweetUrl(tweetId), "_blank");
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
  useDisableZoom();
  const isOpen = useIsDrawerOpen();
  const drawerData = useDrawerData();
  const size = useWindowSize();
  const [openBillboardSnackbar, setOpenBillboardSnackbar] = useState(false);
  const anchor = useMemo(
    () => (size.width > 768 ? "left" : "bottom"),
    [size.width]
  );
  const [showSavedData, setShowSavedData] = useState(true);

  const { data, isLoading, error } = useSWR<Data | undefined>(
    locationsURL(drawerData?.reference),
    dataFetcher
  );

  function copyBillboard(url: string) {
    navigator.clipboard.writeText(url);
    setOpenBillboardSnackbar(true);
  }

  const { handleMarkerClick: toggler } = useMapClickHandlers();

  const list = useMemo(() => {
    const { formatted_address, extraParameters: extraParametersAsJSON } =
      dataTransformer(data);

    let extraParameters = {
      tweet_id: "",
      name: "",
      full_text: "",
      user_id: "",
    };

    try {
      extraParameters = JSON.parse(extraParametersAsJSON || "{}");
      extraParameters.full_text = data?.full_text!;
    } catch (e) {
      // I don't that trust that extraParameters JSON string, so it is better
      // to not to crash the UI.
      console.error(e);
    }

    if (!drawerData) {
      return null;
    }

    const formattedCoordinates = formatcoords([
      drawerData.geometry.location.lat,
      drawerData.geometry.location.lng,
    ]).format();

    const formattedTimeAgo = data && getTimeAgo(data.timestamp);

    return (
      <Box
        sx={{
          width: size.width > 768 ? 400 : "full",
          display: "flex",
          height: "100%",
          padding: "1rem 2rem 1rem 1rem",
          flexDirection: "column",
          overflow: "auto",
        }}
        role="presentation"
        onKeyDown={(e) => toggler(e)}
      >
        {isLoading && (
          <Box
            sx={{
              minHeight: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {error && <GenericError />}
        {!isLoading && data && (
          <div className={styles.content}>
            <span className={styles.contentIdSection}>
              ID: {drawerData.reference}
            </span>
            <h3 style={{ maxWidth: "45ch" }}>{formatted_address}</h3>
            {formattedTimeAgo && (
              <div className={styles.contentInfo}>
                <svg viewBox="0 0 16 16" width="16" height="16" fill="#111111">
                  <path d="M8.2 1.3c-3.7 0-6.7 3-6.7 6.7s3 6.7 6.7 6.7 6.7-3 6.6-6.7-3-6.7-6.6-6.7zM12 8.7h-4.5V4h1.3v3.3H12v1.4z" />
                </svg>
                <span>Bildirim zamanı: {formattedTimeAgo}</span>
              </div>
            )}
            <div className={styles.contentInfo}>
              <svg viewBox="0 0 16 16" width="16" height="16" fill="#111111">
                <path d="M8 1A5.5 5.5 0 0 0 2.5 6.5a5.4 5.4 0 0 0 1.1 3.3s0.1 0.2 0.2 0.2L8 15l4.2-5c0 0 0.2-0.2 0.2-0.2l0 0A5.4 5.4 0 0 0 13.5 6.5 5.5 5.5 0 0 0 8 1Zm0 7.5a2 2 0 1 1 2-2 2 2 0 0 1-2 2Z" />
                <path d="M8 6.5m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" fill="none" />
              </svg>
              <span>{formattedCoordinates}</span>
            </div>

            <div className={styles.contentButtons}>
              {mapsButtons.map((button) => (
                <Button
                  key={button.label}
                  variant="contained"
                  onClick={() => {
                    button.urlCallback(
                      drawerData.geometry.location.lat,
                      drawerData.geometry.location.lng
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
                  drawerData.geometry.location.lat,
                  drawerData.geometry.location.lng
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
                      `https://www.google.com/maps/@${drawerData.geometry.location.lat.toString()},${drawerData.geometry.location.lng.toString()},22z`
                    )
                  }
                  startIcon={<CopyAll className={styles.btnIcon} />}
                >
                  Kopyala
                </Button>
                {extraParameters.tweet_id && (
                  <Button
                    variant="outlined"
                    className={styles.clipboard}
                    fullWidth
                    size="small"
                    onClick={() =>
                      window.open(
                        `https://twitter.com/anyuser/status/${extraParameters?.tweet_id}`
                      )
                    }
                    startIcon={<OpenInNew className={styles.btnIcon} />}
                    color="secondary"
                  >
                    Kaynak
                  </Button>
                )}
              </div>
            </div>
            <div className={styles.sourceContent}>
              <div className={styles.sourceHelpContent}>
                <Typography className={styles.sourceContentTitle}>
                  Yardım İçeriği
                </Typography>
                {extraParameters.name && (
                  <div className={styles.sourceContentSwitch}>
                    <p>Kayıtlı veriyi göster</p>
                    <Switch
                      checked={showSavedData}
                      onChange={() => setShowSavedData((s) => !s)}
                    />
                  </div>
                )}
              </div>
              {showSavedData ? (
                <PlaceholderTweet source={extraParameters} />
              ) : (
                <EmbedTweet source={extraParameters} />
              )}
            </div>
          </div>
        )}

        <CloseIcon onClick={(e) => toggler(e)} className={styles.closeButton} />
      </Box>
    );
  }, [data, size.width, toggler, showSavedData, isLoading, error, drawerData]);

  const handleClose = useCallback((e: MouseEvent) => toggler(e), [toggler]);

  return (
    <div>
      <Snackbar
        open={openBillboardSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenBillboardSnackbar(false)}
        message="Adres Kopyalandı"
      />
      <MuiDrawer
        className={styles.drawer}
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
