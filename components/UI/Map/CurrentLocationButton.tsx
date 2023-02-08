import { useGetUserLocation } from "@/hooks/useGetUserLocation";
import { useLeafletMap } from "@/stores/mapStore";
import { MyLocationOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect } from "react";
import styles from "./CurrentLocationButton.module.css";

const CurrentLocationButton = () => {
  const { location, getUserLocation } = useGetUserLocation();
  const map = useLeafletMap();

  useEffect(() => {
    location &&
      map?.panTo({
        lat: location.latitude,
        lng: location.longitude,
      });
  }, [location, map]);

  return (
    <span className={styles.iconLocationContainer}>
      <IconButton
        className={styles.iconLocationButton}
        onClick={getUserLocation}
      >
        <MyLocationOutlined fontSize="small" />
      </IconButton>
    </span>
  );
};

export default CurrentLocationButton;
