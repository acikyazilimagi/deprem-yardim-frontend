import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import styles from "./Drawer.module.css";
import Tag from "../Tag/Tag";
import CloseIcon from "@mui/icons-material/Close";
export default function MyDrawer() {
  const [isOpen, setOpen] = React.useState(false);

  const toggleDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen((prev) => !prev);
    };

  const list = () => (
    <Box
      sx={{ width: 372, display: "flex", flexDirection: "column" }}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <div className={styles.content}>
        <Tag color="#74080A">Yoğun</Tag>
        <h3>Kahramanmaraş, Tavşantepe, Hürriyet Mahallesi, Erşan Sokak</h3>
        <p> {`36°30'18.2"N 36°16'17.6"E`}</p>
      </div>
      <CloseIcon
        className={styles.closeButton}
        onClick={() => toggleDrawer()}
      />
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer()}>Left</Button>
      <Drawer anchor={"left"} open={isOpen} onClose={toggleDrawer()}>
        {list()}
      </Drawer>
    </div>
  );
}
