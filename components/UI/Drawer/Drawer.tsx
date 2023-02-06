import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import { default as MuiDrawer } from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import styles from "./Drawer.module.css";
import Tag from "../Tag/Tag";
import { Tags } from "../Tag/Tag.types";
import CloseIcon from "@mui/icons-material/Close";
import { useWindowSize } from "@/hooks/useWindowsSize";
import { IMarker } from "../Map/utils";

export default function Drawer({
  isOpen,
  toggler,
  data,
}: {
  isOpen: boolean;
  toggler: (e: any) => void;
  data: IMarker;
}) {
  const size = useWindowSize();

  const list = useMemo(() => {
    const { intensity, lat, lng, name } = data;
    return (
      <Box
        sx={{
          width: size.width > 768 ? 372 : "full",
          display: "flex",
          flexDirection: "column",
        }}
        role="presentation"
        onClick={(e: any) => toggler(e)}
        onKeyDown={(e: any) => toggler(e)}
      >
        <div className={styles.content}>
          <Tag color={Tags[intensity]?.color}>{Tags[intensity]?.intensity}</Tag>
          <h3>{name}</h3>
          <p> {`${lat}"N ${lng}"E`}</p>
        </div>
        <CloseIcon className={styles.closeButton} />
      </Box>
    );
  }, []);

  return (
    <div>
      <Button onClick={(e: any) => toggler(e)}>Left</Button>
      <MuiDrawer
        className="drawer"
        anchor={size.width > 768 ? "left" : "bottom"}
        open={isOpen}
        onClose={(e: any) => toggler(e)}
      >
        {list}
      </MuiDrawer>
    </div>
  );
}
