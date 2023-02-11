import React, { ReactNode } from "react";
import { Apple, DriveEta, Google } from "@mui/icons-material";
import styles from "../Drawer.module.css";
import Button from "@mui/material/Button";
import { MarkerData } from "@/mocks/types";
import { useTranslation } from "next-i18next";

interface MapsButton {
  label: string;
  // eslint-disable-next-line no-unused-vars
  urlCallback: (lat: number, lng: number) => void;
  icon: ReactNode;
  color: "primary" | "secondary" | "inherit";
}

export const generateGoogleMapsUrl = (lat: number, lng: number) => {
  return `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`;
};

export const generateAppleMapsUrl = (lat: number, lng: number) => {
  return `http://maps.apple.com/?q=${lat},${lng}&ll=${lat},${lng}&z=18`;
};

export const generateTweetUrl = (tweetId: string) => {
  return `https://twitter.com/anyuser/status/${tweetId}`;
};

export const openTweetUrl = (tweetId: string) => {
  window.open(generateTweetUrl(tweetId), "_blank");
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
    label: "google",
    urlCallback: openGoogleMapsUrl,
    icon: <Google className={styles.btnIcon} />,
    color: "primary",
  },
  {
    label: "apple",
    urlCallback: openAppleMapsUrl,
    icon: <Apple className={styles.btnIcon} />,
    color: "inherit",
  },
  {
    label: "direction",
    urlCallback: openGoogleMapsDirectionUrl,
    icon: <DriveEta className={styles.btnIcon} />,
    color: "secondary",
  },
];

interface Props {
  drawerData: MarkerData;
}

export default function MapButtons({ drawerData }: Props) {
  const { t } = useTranslation("home");
  return (
    <div className={styles.contentButtons}>
      {mapsButtons.map((button) => (
        <Button
          key={t(`cluster.mapButtons.${button.label}`).toString()}
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
          {t(`cluster.mapButtons.${button.label}`)}
        </Button>
      ))}
    </div>
  );
}
