import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { default as MuiDrawer } from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import styles from "./Drawer.module.css";
import Tag from "../Tag/Tag";
import { Tags } from "../Tag/Tag.types";
import CloseIcon from "@mui/icons-material/Close";
import { useWindowSize } from "@/hooks/useWindowsSize";
import { IconButton, InputAdornment, Snackbar, TextField } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";

export default function Drawer({
  isOpen,
  toggler,
  data,
}: {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  toggler: (e: any) => void;
  data: any;
}) {
  const size = useWindowSize();
  const [openBillboardSnackbar, setOpenBillboardSnackbar] = useState(false);

  function openGoogleMap(lat: string, lng: string) {
    window.open(`https://www.google.com/maps/@${lat},${lng},22z`, "_blank");
  }

  function copyBillboard(url: string) {
    navigator.clipboard.writeText(url);
    setOpenBillboardSnackbar(true);
  }

  const list = useMemo(() => {
    if (!data) {
      return null;
    }
    const { geometry, formatted_address } = data;
    return (
      <Box
        sx={{
          width: size.width > 768 ? 372 : "full",
          display: "flex",
          flexDirection: "column",
        }}
        role="presentation"
        onKeyDown={(e: any) => toggler(e)}
      >
        <div className={styles.content}>
          <Tag color={Tags["mid"]?.color}>{Tags["mid"]?.intensity}</Tag>
          <h3>{formatted_address}</h3>
          <p> {`${geometry.location.lat}"N ${geometry.location.lng}"E`}</p>
          <div className={styles.contentButton}>
            <Button
              variant="contained"
              onClick={() =>
                openGoogleMap(
                  geometry.location.lat.toString(),
                  geometry.location.lng.toString()
                )
              }
            >
              Google Haritalar ile gör
            </Button>
          </div>

          <div>
            <TextField
              fullWidth
              variant="standard"
              value={`https://www.google.com/maps/@${geometry.location.lat.toString()},${geometry.location.lng.toString()},22z`}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      onClick={() =>
                        copyBillboard(
                          `https://www.google.com/maps/@${geometry.location.lat.toString()},${geometry.location.lng.toString()},22z`
                        )
                      }
                    >
                      <FileCopyIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                readOnly: true,
              }}
            />
          </div>
        </div>
        <CloseIcon onClick={(e: any) => toggler(e)} className={styles.closeButton} />
      </Box>
    );
  }, [data, size.width, toggler]);

  return (
    <div>
      <Snackbar
        open={openBillboardSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenBillboardSnackbar(false)}
        message="Adres Kopyalandı"
      />
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
