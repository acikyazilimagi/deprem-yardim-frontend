import React, { useEffect, useState } from "react";

import { useSnackbar } from "@/components/base/Snackbar";
import { useMapActions, usePopUpData } from "@/stores/mapStore";
import LaunchIcon from "@mui/icons-material/Launch";
import { Button, Stack, Typography, alpha } from "@mui/material";
import MuiPopover from "@mui/material/Popover";
import formatcoords from "formatcoords";
import { CopyButton } from "../Button/CopyButton";
import { generateGoogleMapsUrl, googleMapsButtons } from "../Drawer/Drawer";
import { findTagByClusterCount } from "../Tag/Tag.types";
import theme from "@/utils/theme";

const ClusterPopup = (props: React.ComponentProps<typeof MuiPopover> | any) => {
  const { setPopUpData } = useMapActions();
  const { enqueueInfo } = useSnackbar();

  const [copyButtonClicked, setCopyButtonClicked] = useState<boolean>(false);

  const data = usePopUpData();
  const lat = data?.baseMarker.geometry.location.lat ?? 0;
  const lng = data?.baseMarker.geometry.location.lng ?? 0;
  const tag = findTagByClusterCount(data?.count ?? 0);

  useEffect(() => {
    if (copyButtonClicked) {
      enqueueInfo("Kopyalandı");
      setCopyButtonClicked(false);
    }
  }, [copyButtonClicked, enqueueInfo]);

  if (!data) return null;

  return (
    <MuiPopover
      {...props}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      onClose={() => setPopUpData(null)}
      open={props.open ?? (data?.baseMarker?.formatted_address ? true : false)}
    >
      <Stack
        direction="column"
        sx={{
          border: "1px solid #E3E8EF",
          width: "368px",
          padding: "24px",
          gap: "12px",
          borderRadius: "8px",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            variant="subtitle2"
            fontWeight="500"
            sx={{ color: "#121926" }}
          >
            {data?.count ?? 0} kişi enkaz altında
          </Typography>
          <Button
            variant="text"
            color="error"
            sx={{
              fontSize: "12px",
              backgroundColor: alpha(tag?.color, 0.1),
            }}
          >
            {tag.intensity}
          </Button>
        </Stack>
        <Typography
          variant="body2"
          sx={{ color: "#364152", pr: "12px", wordWrap: "break-word" }}
        >
          {data?.baseMarker?.formatted_address}
        </Typography>
        <Typography variant="body2" sx={{ color: "#364152" }} fontWeight="500">
          {formatcoords([lat, lng]).format()}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {googleMapsButtons.map((button) => (
            <Button
              key={button.label}
              variant="text"
              color="primary"
              size="small"
              endIcon={<LaunchIcon fontSize="small" />}
              sx={{
                textTransform: "unset",
                fontSize: "14px",
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                mr: 1,
                px: 1,
              }}
              onClick={() => button.urlCallback(lat, lng)}
            >
              {button.label}
            </Button>
          ))}
          <CopyButton
            color="primary"
            data={generateGoogleMapsUrl(lat, lng)}
            onClick={() => setCopyButtonClicked(true)}
          />
        </Stack>
      </Stack>
    </MuiPopover>
  );
};

ClusterPopup.displayName = "ClusterPopup";

export default ClusterPopup;
