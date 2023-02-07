import React, { useMemo, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { default as MuiDrawer } from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import styles from "./Drawer.module.css";
import Tag from "../Tag/Tag";
import { Tags } from "../Tag/Tag.types";
import CloseIcon from "@mui/icons-material/Close";
import RenderIf from "@/components/UI/Common/RenderIf";
import { useWindowSize } from "@/hooks/useWindowsSize";
import { Snackbar, TextField } from "@mui/material";
import { KeyboardEvent, MouseEvent } from "react";
import { useDrawerData, useIsDrawerOpen } from "@/stores/mapStore";
import { OpenInNew, EmergencyShare } from "@mui/icons-material";

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
  const [openBillboardSnackbar, setOpenBillboardSnackbar] = useState(false);
  const [canShare, setCanShare] = useState<boolean>(false);

  function copyBillboard(url: string) {
    navigator.clipboard.writeText(url);
    setOpenBillboardSnackbar(true);
  }

  const checkCanShare = (): boolean => {
    try {
      const shareTestData = {
        text: "Dummy Share test",
        link: "https://www.google.com/maps/@37.0097206,37.792836,22z",
      };

      return navigator.canShare(shareTestData);
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    setCanShare(checkCanShare());
  }, []);

  const sharePin = (data: {
    geometry: { location: { lat: number; lng: number } };
    formatted_address: string;
  }) => {
    const { geometry, formatted_address } = data;
    const shareData = {
      text: formatted_address,
      url: generateGoogleMapsUrl(geometry.location.lat, geometry.location.lng),
    };

    try {
      navigator
        .share(shareData)
        .catch((error) => console.log("Error sharing", error));
    } catch (err) {
      alert(
        "Tarayıcınız bu özelliği desteklemiyor. Lütfen adresi kopyalayarak paylaşın."
      );
    }
  };

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
            <RenderIf condition={canShare}>
              <Button
                variant="outlined"
                className={styles.share}
                size="small"
                onClick={() => sharePin(data)}
              >
                Paylaş
                <EmergencyShare className={styles.openInNewIcon} />
              </Button>
            </RenderIf>
          </div>
        </div>
        <CloseIcon onClick={(e) => toggler(e)} className={styles.closeButton} />
      </Box>
    );
  }, [data, size.width, toggler, canShare]);

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
