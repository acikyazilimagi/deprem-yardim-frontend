import * as React from "react";
import Box from "@mui/material/Box";
import { default as MuiDrawer } from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import styles from "./Drawer.module.css";
import Tag from "../Tag/Tag";
import { Tags } from "../Tag/Tag.types";
import CloseIcon from "@mui/icons-material/Close";
import { useWindowSize } from "@/hooks/useWindowsSize";

export default function Drawer({ isOpen, toggler, data }: any) {
  const size = useWindowSize();

  function openGoogleMap(lat: string, lng: string) {
     window.open(`https://www.google.com/maps/@${lat},${lng},14z`, '_blank');
  }

  const list = () => (
    <Box
      sx={{
        width: size.width > 768 ? 372 : "full",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
      onClick={toggler()}
      onKeyDown={toggler()}
    >
      <div className={styles.content}>
        <Tag color={Tags[data?.intensity]?.color}>
          {Tags[data?.intensity]?.intensity}
        </Tag>
        <h3>{data?.name}</h3>
        <p> {`${data?.lat}"N ${data?.lng}"E`}</p>
        <Button onClick={() => openGoogleMap(data?.lat, data?.lng)}> Google Map&apos;te Göster</Button>
      </div>
      <CloseIcon className={styles.closeButton} onClick={() => toggler()} />
    </Box>
  );

  return (
    <div>
      <Button onClick={toggler()}>Left</Button>
      <MuiDrawer
        className="drawer"
        anchor={size.width > 768 ? "left" : "bottom"}
        open={isOpen}
        onClose={toggler()}
      >
        {list()}
      </MuiDrawer>
    </div>
  );
}
