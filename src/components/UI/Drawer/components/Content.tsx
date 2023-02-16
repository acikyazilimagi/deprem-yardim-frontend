import useSWR from "swr";
import formatcoords from "formatcoords";
import { getTimeAgo } from "@/utils/date";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useMapClickHandlers } from "@/hooks/useMapClickHandlers";
import { locationsURL } from "@/utils/urls";
import { dataFetcher } from "@/services/dataFetcher";
import { CopyAll, OpenInNew } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "../Drawer.module.css";
import FeedContent from "./channels/FeedContent";
import GenericError from "../../GenericError/GenericError";
import MapButtons, { generateGoogleMapsUrl } from "./MapButtons";
import { useTranslation } from "next-i18next";
import { CloseByRecord } from "./OtherRecordsInSameLocation";
import { useRouter } from "next/router";
import { parseChannelData } from "@/hooks/useLocation";
import { DrawerData, useMapActions } from "@/stores/mapStore";
import { useState } from "react";
import {
  BabalaData,
  APIResponse,
  BabalaParameters,
  TwitterData,
  TwitterParameters,
  ChannelData,
} from "@/types";

export interface ContentProps {
  onCopyBillboard: (_clipped: string) => void;
  drawerData: DrawerData;
}

export const Content = ({ drawerData, onCopyBillboard }: ContentProps) => {
  const { t } = useTranslation("home");
  // const [rawData, setRawData] = useState<TwitterData | BabalaData | null>(null);
  const { toggleDrawer, setDrawerData, setEventType } = useMapActions();

  const { isLoading, error } = useSWR<APIResponse>(
    drawerData?.reference ? locationsURL(drawerData.reference) : null,
    dataFetcher,
    {
      onSuccess: (data) => {
        if (
          data.channel.toLowerCase() === "twitter" ||
          data.channel.toLowerCase() === "babala"
        ) {
          setDrawerData(
            parseChannelData(data, {
              transformResponse: (res) => ({
                channel: res.channel.toLowerCase() as "twitter" | "babala",
                geometry: { location: { lat: 0, lng: 0 } },
                properties: {
                  ...res,
                  ...res.extraParams,
                },
                reference: res.entry_id,
              }),
            }) as TwitterData | BabalaData
          );
        }

        // if (!data) return;
      },
    }
  );

  const size = useWindowSize();
  const { handleMarkerClick: toggler } = useMapClickHandlers();
  const router = useRouter();

  if (!drawerData) {
    return null;
  }

  const data = drawerData.properties;

  const locale = router.locale;

  console.log({ error });

  const formattedCoordinates = formatcoords([
    drawerData.geometry.location?.lng,
    drawerData.geometry.location?.lat,
  ]).format();

  const twitterBabala = data as
    | TwitterData["properties"]
    | BabalaData["properties"]
    | undefined;

  const formattedTimeAgo =
    twitterBabala?.timestamp && getTimeAgo(twitterBabala.timestamp, locale);

  const hasSource =
    data &&
    drawerData?.channel === "twitter" &&
    (data as TwitterParameters).tweet_id !== "";

  const title =
    twitterBabala?.formatted_address ??
    (drawerData.properties as { name: string } | undefined)?.name;

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
      {!isLoading && (
        <div className={styles.content}>
          {drawerData.reference && (
            <span className={styles.contentIdSection}>
              ID: {drawerData.reference}
            </span>
          )}
          {title && <h3 style={{ maxWidth: "45ch" }}>{title}</h3>}
          {formattedTimeAgo && (
            <div className={styles.contentInfo}>
              <svg viewBox="0 0 16 16" width="16" height="16" fill="#111111">
                <path d="M8.2 1.3c-3.7 0-6.7 3-6.7 6.7s3 6.7 6.7 6.7 6.7-3 6.6-6.7-3-6.7-6.6-6.7zM12 8.7h-4.5V4h1.3v3.3H12v1.4z" />
              </svg>
              <span>
                {t("content.notifyTime")}: {formattedTimeAgo}
              </span>
            </div>
          )}
          <div className={styles.contentInfo}>
            <svg viewBox="0 0 16 16" width="16" height="16" fill="#111111">
              <path d="M8 1A5.5 5.5 0 0 0 2.5 6.5a5.4 5.4 0 0 0 1.1 3.3s0.1 0.2 0.2 0.2L8 15l4.2-5c0 0 0.2-0.2 0.2-0.2l0 0A5.4 5.4 0 0 0 13.5 6.5 5.5 5.5 0 0 0 8 1Zm0 7.5a2 2 0 1 1 2-2 2 2 0 0 1-2 2Z" />
              <path d="M8 6.5m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" fill="none" />
            </svg>
            <span>{formattedCoordinates}</span>
          </div>
          <MapButtons drawerData={drawerData} />
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
                  onCopyBillboard(
                    `https://www.google.com/maps/@${drawerData.geometry.location.lat.toString()},${drawerData.geometry.location.lng.toString()},22z`
                  )
                }
                startIcon={<CopyAll className={styles.btnIcon} />}
              >
                {t("cluster.mapButtons.copy")}
              </Button>
              {hasSource && (
                <Button
                  variant="outlined"
                  className={styles.clipboard}
                  fullWidth
                  size="small"
                  onClick={() =>
                    window.open(
                      // @ts-ignore: tweet_id generic olmadığı için kızıyor, type ile fixlenebilir
                      `https://twitter.com/anyuser/status/${data.extra_parameters?.tweet_id}`
                    )
                  }
                  startIcon={<OpenInNew className={styles.btnIcon} />}
                  color="secondary"
                >
                  {t("content.source")}
                </Button>
              )}
            </div>
          </div>
          <FeedContent content={drawerData} />
          {/* {(data ||
            (drawerData as AhbapData).channel === "ahbap" ||
            (drawerData as SafePlaceData).channel ===
              "guvenli_yerler_oteller" ||
            (drawerData as TeleteyitData).channel === "teleteyit" ||
            (drawerData as SatelliteData).channel === "uydu" ||
            (drawerData as SahraKitchenData).channel === "sahra_mutfak" ||
            (drawerData as PharmacyData).channel === "eczane_excel") && (
            <FeedContent content={data ?? (drawerData as AhbapData)} />
          )} */}
        </div>
      )}

      <CloseByRecord drawerData={drawerData} />

      <CloseIcon onClick={(e) => toggler(e)} className={styles.closeButton} />
    </Box>
  );
};
