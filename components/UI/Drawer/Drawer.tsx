import * as React from "react";
import Box from "@mui/material/Box";
import { default as MuiDrawer } from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import styles from "./Drawer.module.css";
import Tag from "../Tag/Tag";
import { Tags } from "../Tag/Tag.types";
import CloseIcon from "@mui/icons-material/Close";
import { useWindowSize } from "@/hooks/useWindowsSize";

export default function Drawer({ isOpen, toggler }: any) {
  const size = useWindowSize();

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
        <Tag color={Tags["high"].color}> {Tags["high"].intensity} </Tag>
        <h3>Kahramanmaraş, Tavşantepe, Hürriyet Mahallesi, Erşan Sokak</h3>
        <p> {`36°30'18.2"N 36°16'17.6"E`}</p>
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
