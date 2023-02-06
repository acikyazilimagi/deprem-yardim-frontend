import React, {useMemo, useState} from "react";
import Box from "@mui/material/Box";
import { default as MuiDrawer } from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import styles from "./Drawer.module.css";
import Tag from "../Tag/Tag";
import { Tags } from "../Tag/Tag.types";
import CloseIcon from "@mui/icons-material/Close";
import { useWindowSize } from "@/hooks/useWindowsSize";
import {IconButton, InputAdornment, Snackbar, TextField} from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import {IMarker} from "@/components/UI/Map/utils";

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
  const [openBillboardSnackbar, setOpenBillboardSnackbar] = useState(false);

    function openGoogleMap(lat: string, lng: string) {
        window.open(`https://www.google.com/maps/@${lat},${lng},14z`, '_blank');
    }

    function copyBillboard(url: string) {
        navigator.clipboard.writeText(url);
        setOpenBillboardSnackbar(true);
    }

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
          <Button onClick={() => openGoogleMap(lat.toString(), lng.toString())}> Google Map&apos;te Göster</Button>
          <div>
            <TextField value={`https://www.google.com/maps/@${data?.lat},${data?.lng},14z`} InputProps={{
                endAdornment: <InputAdornment position="start">
                    <IconButton onClick={() => copyBillboard(`https://www.google.com/maps/@${data?.lat},${data?.lng},14z`)}>
                        <FileCopyIcon />
                    </IconButton>
                </InputAdornment>,
                readOnly: true,
            }} />
          </div>
        </div>
        <CloseIcon className={styles.closeButton} />
      </Box>
    );
  }, []);

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
