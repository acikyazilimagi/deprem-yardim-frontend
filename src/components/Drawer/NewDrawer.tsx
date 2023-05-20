import styles from "./Drawer.module.css";
import { default as MuiDrawer } from "@mui/material/Drawer";
import { DrawerData } from "@/stores/mapStore";
import { ChannelData } from "@/types";
import Button from "@mui/material/Button";
import { CopyAll } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import formatcoords from "formatcoords";
import { MapButtons, generateGoogleMapsUrl } from "./components/MapButtons";
import TextField from "@mui/material/TextField";
import { PropsWithChildren } from "react";
import { FeedContent } from "./components/channels/FeedContent";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useRouter } from "next/router";
import RoomIcon from "@mui/icons-material/Room";
import omit from "lodash.omit";
import Link from "next/link";

const DrawerIDLabel = ({ id }: { id: number }) => {
  return <span className={styles.contentIdSection}>ID: {id}</span>;
};

const Coordinates = ({ coordinates }: { coordinates: string }) => {
  return (
    <div className={styles.contentInfo}>
      <RoomIcon fontSize="small" />
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
        value={generateGoogleMapsUrl(data.location.lat, data.location.lng)}
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
              `https://www.google.com/maps/@${data.location.lat.toString()},${data.location.lng.toString()},22z`
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
  data: DrawerData;
  onCopyBillboard: (_clipped: string) => void;
};

export const Drawer = ({ data, onCopyBillboard }: DrawerProps) => {
  const size = useWindowSize();
  const anchor = size.width > 768 ? "left" : "bottom";
  const router = useRouter();

  return (
    <MuiDrawer
      className={styles.drawer}
      open={!!data}
      anchor={anchor}
      hideBackdrop
    >
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
      >
        {data && (
          <DrawerContent data={data} onCopyBillboard={onCopyBillboard} />
        )}
        {/* <CloseByRecord drawerData={drawerData} /> */}
        <Link
          href={{
            pathname: "/",
            query: omit(router.query, "id"),
            hash: window.location.hash,
          }}
        >
          <CloseIcon className={styles.closeButton} />
        </Link>
      </Box>
    </MuiDrawer>
  );
};

const DrawerContent = ({
  data,
  onCopyBillboard,
}: {
  data: NonNullable<DrawerData>;
  onCopyBillboard: DrawerProps["onCopyBillboard"];
}) => {
  const title = data.properties.name;

  const formattedCoordinates = formatcoords([
    data.location?.lng,
    data.location?.lat,
  ]).format();

  return (
    <div className={styles.content}>
      {data?.reference && <DrawerIDLabel id={data.reference} />}
      {title && <h3 style={{ maxWidth: "45ch" }}>{title}</h3>}
      <Coordinates coordinates={formattedCoordinates} />
      <MapButtons drawerData={data} />
      <GoogleMapsStuff data={data} onCopyBillboard={onCopyBillboard} />
      <FeedContent content={data} />
    </div>
  );
};
