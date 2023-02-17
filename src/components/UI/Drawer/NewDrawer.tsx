import styles from "./Drawer.module.css";
import { default as MuiDrawer } from "@mui/material/Drawer";
import { DrawerData } from "../../../stores/mapStore";
import { ChannelData, TwitterParameters } from "@/types";
import Button from "@mui/material/Button";
import { CopyAll, OpenInNew } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import formatcoords from "formatcoords";
import MapButtons, { generateGoogleMapsUrl } from "./components/MapButtons";
import TextField from "@mui/material/TextField";
import { PropsWithChildren } from "react";
import FeedContent from "./components/channels/FeedContent";
import CloseIcon from "@mui/icons-material/Close";

const DrawerIDLabel = ({ id }: { id: number }) => {
  return <span className={styles.contentIdSection}>ID: {id}</span>;
};

const TwitterButton = ({ data }: { data: ChannelData }) => {
  const { t } = useTranslation("home");

  return (
    <Button
      variant="outlined"
      className={styles.clipboard}
      fullWidth
      size="small"
      onClick={() =>
        window.open(
          // @ts-ignore: tweet_id generic olmadığı için kızıyor, type ile fixlenebilir
          `https://twitter.com/anyuser/status/${data.properties.tweet_id}`
        )
      }
      startIcon={<OpenInNew className={styles.btnIcon} />}
      color="secondary"
    >
      {t("content.source")}
    </Button>
  );
};

const TimeLabel = ({ timeLabel }: { timeLabel: string }) => {
  const { t } = useTranslation("home");

  return (
    <div className={styles.contentInfo}>
      <svg viewBox="0 0 16 16" width="16" height="16" fill="#111111">
        <path d="M8.2 1.3c-3.7 0-6.7 3-6.7 6.7s3 6.7 6.7 6.7 6.7-3 6.6-6.7-3-6.7-6.6-6.7zM12 8.7h-4.5V4h1.3v3.3H12v1.4z" />
      </svg>
      <span>
        {t("content.notifyTime")}: {timeLabel}
      </span>
    </div>
  );
};

const Coordinates = ({ coordinates }: { coordinates: string }) => {
  return (
    <div className={styles.contentInfo}>
      <svg viewBox="0 0 16 16" width="16" height="16" fill="#111111">
        <path d="M8 1A5.5 5.5 0 0 0 2.5 6.5a5.4 5.4 0 0 0 1.1 3.3s0.1 0.2 0.2 0.2L8 15l4.2-5c0 0 0.2-0.2 0.2-0.2l0 0A5.4 5.4 0 0 0 13.5 6.5 5.5 5.5 0 0 0 8 1Zm0 7.5a2 2 0 1 1 2-2 2 2 0 0 1-2 2Z" />
        <path d="M8 6.5m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" fill="none" />
      </svg>
      <span>{coordinates}</span>
    </div>
  );
};

const GoogleMapsStuff = ({
  children,
  data,
  onCopyBillboard,
}: PropsWithChildren<{
  data: ChannelData;
  onCopyBillboard: (_clipped: string) => void;
}>) => {
  const { t } = useTranslation("home");
  return (
    <div>
      <TextField
        fullWidth
        variant="standard"
        size="small"
        value={generateGoogleMapsUrl(
          data.geometry.location.lat,
          data.geometry.location.lng
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
              `https://www.google.com/maps/@${data.geometry.location.lat.toString()},${data.geometry.location.lng.toString()},22z`
            )
          }
          startIcon={<CopyAll className={styles.btnIcon} />}
        >
          {t("cluster.mapButtons.copy")}
        </Button>
        {children}
      </div>
    </div>
  );
};

type DrawerProps = {
  data: NonNullable<DrawerData>;
  title?: string;
  timeLabel?: string;
  handleDataDrawerClose: () => void;
  onCopyBillboard: (_clipped: string) => void;
};

export const Drawer = ({
  data,
  title,
  timeLabel,
  handleDataDrawerClose,
  onCopyBillboard,
}: DrawerProps) => {
  const hasSource =
    data &&
    data?.channel === "twitter" &&
    (data.properties as TwitterParameters).tweet_id !== "";

  const formattedCoordinates = formatcoords([
    data.geometry.location?.lng,
    data.geometry.location?.lat,
  ]).format();

  return (
    <MuiDrawer className={styles.drawer} open={!!data}>
      <div className={styles.content}>
        {data?.reference && <DrawerIDLabel id={data.reference} />}
        {title && <h3 style={{ maxWidth: "45ch" }}>{title}</h3>}
        {timeLabel && <TimeLabel timeLabel={timeLabel} />}
        <Coordinates coordinates={formattedCoordinates} />
        <MapButtons drawerData={data} />
        <GoogleMapsStuff data={data} onCopyBillboard={onCopyBillboard}>
          {hasSource && <TwitterButton data={data} />}
        </GoogleMapsStuff>
        <FeedContent content={data} />
      </div>
      {/* <CloseByRecord drawerData={drawerData} /> */}

      <CloseIcon
        onClick={handleDataDrawerClose}
        className={styles.closeButton}
      />
    </MuiDrawer>
  );
};
