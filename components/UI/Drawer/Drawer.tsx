import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { default as MuiDrawer } from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import styles from "./Drawer.module.css";
import Tag from "../Tag/Tag";
import { Tags } from "../Tag/Tag.types";
import CloseIcon from "@mui/icons-material/Close";
import RenderIf from "@/components/UI/Common/RenderIf";
import { useWindowSize } from "@/hooks/useWindowsSize";
import { Snackbar, TextField, Typography } from "@mui/material";
import { KeyboardEvent, MouseEvent } from "react";
import { useDrawerData, useIsDrawerOpen } from "@/stores/mapStore";
import { OpenInNew } from "@mui/icons-material";
import { useNavigatorShare } from "@/hooks/useNavigatorShare";

interface DrawerProps {
  toggler: (_e: KeyboardEvent | MouseEvent) => void;
}

function generateGoogleMapsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/@${lat},${lng},22z`;
}

export default function Drawer({ toggler }: DrawerProps) {
  const isOpen = useIsDrawerOpen();
  const data = useDrawerData();
  const size = useWindowSize();
  const [canShare, share] = useNavigatorShare();
  const [openBillboardSnackbar, setOpenBillboardSnackbar] = useState(false);

  function copyBillboard(url: string) {
    navigator.clipboard.writeText(url);
    setOpenBillboardSnackbar(true);
  }

  const list = useMemo(() => {
    if (!data) {
      return null;
    }
    const { geometry, formatted_address, source } = data;
    return (
      <Box
        sx={{
          width: size.width > 768 ? 372 : "full",
          display: "flex",
          flexDirection: "column",
        }}
        role="presentation"
        onKeyDown={(e) => toggler(e)}
      >
        <div className={styles.content}>
          <Tag color={Tags["mid"]?.color}>{Tags["mid"]?.intensity}</Tag>
          <h3>{formatted_address}</h3>
          <p> {`${geometry.location.lat}"N ${geometry.location.lng}"E`}</p>
          <div className={styles.contentButton}>
            <Button
              variant="contained"
              onClick={() =>
                window.open(
                  generateGoogleMapsUrl(
                    geometry.location.lat,
                    geometry.location.lng
                  ),
                  "_blank"
                )
              }
              className={styles.externalLinkButton}
            >
              Google Haritalar ile Gör
              <OpenInNew className={styles.openInNewIcon} />
            </Button>
          </div>
          <div>
            <TextField
              fullWidth
              variant="standard"
              value={generateGoogleMapsUrl(
                geometry.location.lat,
                geometry.location.lng
              )}
              InputProps={{
                sx: { paddingRight: "1rem" },
                readOnly: true,
              }}
            />
            <div className={styles.actionButtons}>
              <Button
                variant="outlined"
                className={styles.clipboard}
                size="small"
                onClick={() =>
                  copyBillboard(
                    `https://www.google.com/maps/@${geometry.location.lat.toString()},${geometry.location.lng.toString()},22z`
                  )
                }
              >
                ADRESİ KOPYALA
              </Button>
              <Button
                variant="outlined"
                className={styles.clipboard}
                size="small"
                onClick={() =>
                  window.open(
                    `https://twitter.com/anyuser/status/${source.tweet_id}`
                  )
                }
              >
                Kaynak
              </Button>
            </div>
          </div>
          <div className={styles.sourceContent}>
            <Typography className={styles.sourceContentTitle}>
              Yardım İçeriği
            </Typography>
            <div className={styles.sourceContentText}>
              <Typography>{source?.full_text}</Typography>
            </div>
          </div>
        </div>
        <CloseIcon onClick={(e) => toggler(e)} className={styles.closeButton} />
      </Box>
    );
  }, [data, size.width, toggler, canShare, share]);

  return (
    <div>
      <Snackbar
        open={openBillboardSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenBillboardSnackbar(false)}
        message="Adres Kopyalandı"
      />
      <MuiDrawer
        className="drawer"
        anchor={size.width > 768 ? "left" : "bottom"}
        open={isOpen}
        onClose={(e) => toggler(e as MouseEvent)}
      >
        {list}
      </MuiDrawer>
    </div>
  );
}
