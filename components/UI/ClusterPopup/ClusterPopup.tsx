import React, { useEffect, useState } from "react";

import { useSnackbar } from "@/components/base/Snackbar";
import { useMapActions, usePopUpData } from "@/stores/mapStore";
import { Button, Stack, Typography, alpha } from "@mui/material";
import MuiPopover from "@mui/material/Popover";
import formatcoords from "formatcoords";
import { CopyButton } from "../Button/CopyButton";
import { generateGoogleMapsUrl, mapsButtons } from "../Drawer/Drawer";
import { findTagByClusterCount } from "../Tag/Tag.types";
import theme from "@/utils/theme";
import { useWindowSize } from "@/hooks/useWindowSize";

const ClusterPopup = (props: React.ComponentProps<typeof MuiPopover> | any) => {
  const { setPopUpData } = useMapActions();
  const { enqueueInfo } = useSnackbar();
  const windowSize = useWindowSize();

  const [copyButtonClicked, setCopyButtonClicked] = useState<boolean>(false);

  const data = usePopUpData();
  const lat = data?.baseMarker.geometry.location.lat ?? 0;
  const lng = data?.baseMarker.geometry.location.lng ?? 0;
  const tag = findTagByClusterCount(data?.count ?? 0);

  useEffect(() => {
    if (copyButtonClicked) {
      enqueueInfo("Koordinat bilgisi kopyalandı.");
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
          padding: "24px",
          gap: "12px",
          borderRadius: "8px",
          width: windowSize.width < 600 ? "100%" : "400px",
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
            {data?.count ?? 0} ihbar mevcut
          </Typography>
          <Button
            variant="text"
            color="error"
            sx={{
              fontSize: windowSize.width < 600 ? "10px" : "12px",
              backgroundColor: alpha(tag?.color, 0.1),
            }}
          >
            {tag.intensity}
          </Button>
        </Stack>
        <Typography
          variant={windowSize.width < 600 ? "body2" : "body1"}
          sx={{
            color: "#364152",
            pr: windowSize.width < 600 ? "18px" : "12px",
            wordWrap: "break-word",
          }}
        >
          {data?.baseMarker?.formatted_address}
        </Typography>
        <Typography
          variant={windowSize.width < 600 ? "overline" : "body2"}
          sx={{ color: "#364152" }}
          fontWeight="500"
        >
          {formatcoords([lat, lng]).format()}
        </Typography>
        <Stack
          sx={{
            display: "flex",
            flexDirection: windowSize.width < 600 ? "column" : "row",
            gap: windowSize.width < 600 ? "12px" : "0px",
            alignItems: windowSize.width < 600 ? "stretch" : "center",
            justifyContent: windowSize.width < 600 ? "stretch" : "flex-end",
          }}
        >
          <Stack
            gap={windowSize.width < 600 ? "12px" : "4px"}
            direction={windowSize.width < 600 ? "column" : "row"}
            justifyContent={"space-between"}
          >
            {mapsButtons.map((button) => (
              <Button
                key={button.label}
                color={button.color}
                size="small"
                sx={{
                  display: "flex",
                  flexDirection: windowSize.width < 600 ? "row" : "column",
                  gap: "4px",
                  textTransform: "unset",
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  px: 1,
                }}
                onClick={() => button.urlCallback(lat, lng)}
              >
                {button.icon}
                <Typography
                  sx={{
                    color: button.color,
                    fontWeight: "500",
                    fontSize: 12,
                  }}
                >
                  {button.label}
                </Typography>
              </Button>
            ))}
          </Stack>
          <CopyButton
            color="primary"
            data={generateGoogleMapsUrl(lat, lng)}
            onClick={() => setCopyButtonClicked(true)}
            title="Koordinatı kopyala"
          />
        </Stack>
      </Stack>
    </MuiPopover>
  );
};

ClusterPopup.displayName = "ClusterPopup";

export default ClusterPopup;
