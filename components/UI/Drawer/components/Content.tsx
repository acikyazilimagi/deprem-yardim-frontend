import useSWR from "swr";
import formatcoords from "formatcoords";
import { dataTransformer } from "@/utils/dataTransformer";
import { Data } from "@/mocks/TypesAreasEndpoint";
import { MarkerData } from "@/mocks/types";
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

export interface ContentProps {
  // eslint-disable-next-line no-unused-vars
  onCopyBillboard: (clipped: string) => void;
  drawerData: MarkerData | null;
}

export const Content = ({ drawerData, onCopyBillboard }: ContentProps) => {
  const {
    data: rawData,
    isLoading,
    error,
  } = useSWR<Data | undefined>(
    locationsURL(drawerData?.reference),
    dataFetcher
  );
  const data = dataTransformer(rawData);
  const size = useWindowSize();
  const { handleMarkerClick: toggler } = useMapClickHandlers();

  if (!drawerData) {
    return null;
  }

  const formattedCoordinates = formatcoords([
    drawerData.geometry.location.lat,
    drawerData.geometry.location.lng,
  ]).format();

  const formattedTimeAgo = rawData && getTimeAgo(rawData.timestamp);

  const hasSource =
    data.channel === "twitter" &&
    // @ts-ignore TODO: gelecek veri twitter verisi ise tweet_id her türlü geliyor, TS tanıyamadığı için kızıyor buralarda
    data.extra_parameters?.tweet_id &&
    // @ts-ignore
    data.extra_parameters?.tweet_id !== "";

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
          <h3 style={{ maxWidth: "45ch" }}>{data.formatted_address}</h3>
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
                Kopyala
              </Button>
              {hasSource && (
                <Button
                  variant="outlined"
                  className={styles.clipboard}
                  fullWidth
                  size="small"
                  onClick={() =>
                    window.open(
                      // @ts-ignore: TODO tweet_id generic olmadığı için kızıyor, type ile fixlenebilir
                      `https://twitter.com/anyuser/status/${data.extra_parameters?.tweet_id}`
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
          <FeedContent content={data} />
        </div>
      )}

      <CloseIcon onClick={(e) => toggler(e)} className={styles.closeButton} />
    </Box>
  );
};
