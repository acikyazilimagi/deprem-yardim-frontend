import { ComponentProps, useEffect, useState } from "react";

import { useSnackbar } from "@/components/base/Snackbar";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useMapActions, usePopUpData } from "@/stores/mapStore";
import theme from "@/utils/theme";
import { Close } from "@mui/icons-material";
import {
  alpha,
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import formatcoords from "formatcoords";
import { CopyButton } from "../Button/CopyButton";
import { useTranslation } from "next-i18next";
import {
  generateGoogleMapsUrl,
  mapsButtons,
} from "../Drawer/components/MapButtons";
import { findTagByClusterCount } from "../Tag/Tag.types";
import useDisableZoom from "@/hooks/useDisableZoom";

const PopupCard = styled(Card)`
  position: absolute;
  bottom: 25px;
  left: 10px;
  cursor: pointer;
  z-index: 1000;
  font-size: 1rem;
  @media (max-width: ${theme.breakpoints.values.sm}px) {
    max-width: unset;
    right: 10px;
    .cluster-address {
      font-size: 13px;
    }
  }
  border: 1px solid #e3e8ef;
  border-radius: "8px";
`;

const ClusterPopup = (props: ComponentProps<typeof Card>) => {
  const { t } = useTranslation("home");
  useDisableZoom();
  const { setPopUpData } = useMapActions();
  const { enqueueInfo, closeSnackbar } = useSnackbar();
  const windowSize = useWindowSize();

  const [copyButtonClicked, setCopyButtonClicked] = useState<boolean>(false);

  const data = usePopUpData();
  const lat = data?.baseMarker.geometry.location.lat ?? 0;
  const lng = data?.baseMarker.geometry.location.lng ?? 0;
  const tag = findTagByClusterCount(data?.count ?? 0);

  useEffect(() => {
    if (copyButtonClicked) {
      enqueueInfo(t("cluster.actions.copied").toString());
      setCopyButtonClicked(false);
      setTimeout(() => {
        closeSnackbar();
      }, 3000);
    }
  }, [copyButtonClicked, enqueueInfo, closeSnackbar, t]);

  if (!data) return null;

  return (
    <PopupCard
      variant="outlined"
      sx={{
        width: windowSize.width < 600 ? "auto" : "500px",
      }}
      {...props}
    >
      <Stack
        direction="column"
        sx={{
          padding: "12px",
          gap: "4px",
        }}
      >
        <Grid container direction="row" alignItems="center">
          <Grid item xs>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography
                variant="subtitle2"
                fontWeight="500"
                sx={{ color: "#121926" }}
              >
                {t("cluster.noticeCount", { count: data?.count ?? 0 })}
              </Typography>
              <Button
                variant="text"
                sx={{
                  fontSize: windowSize.width < 600 ? "10px" : "12px",
                  p: "4px 8px",
                  backgroundColor: alpha(tag?.color, 0.7),
                  color: "#212121",
                  "&:hover": {
                    backgroundColor: alpha(tag?.color, 1),
                  },
                }}
              >
                {t(`tags.${tag.intensity}`)}
              </Button>
            </Stack>
          </Grid>
          <Grid item xs="auto">
            <IconButton
              aria-label="close"
              onClick={() => setPopUpData(null)}
              size="small"
            >
              <Close fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
        <Typography
          variant={windowSize.width < 600 ? "overline" : "body2"}
          sx={{ color: "#364152" }}
          fontWeight="500"
        >
          {formatcoords([lat, lng]).format()}
        </Typography>
        <Grid container justifyContent="space-around" spacing={1}>
          <Grid item xs={7} sm>
            <Stack
              gap={"4px"}
              direction={windowSize.width < 600 ? "column" : "row"}
            >
              {mapsButtons.slice(0, 2).map((button) => (
                <Button
                  key={t(`cluster.mapButtons.${button.label}`).toString()}
                  color={button.color}
                  size="small"
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "row",
                    gap: "4px",
                    textTransform: "unset",
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.15),
                    },
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
                    {t(`cluster.mapButtons.${button.label}`)}
                  </Typography>
                </Button>
              ))}
            </Stack>
          </Grid>
          <Grid
            item
            xs={5}
            sm="auto"
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Stack
              gap={"4px"}
              direction={windowSize.width < 600 ? "column" : "row"}
              sx={{
                width: "100%",
              }}
            >
              {mapsButtons.slice(2).map((button) => (
                <Button
                  key={button.label}
                  color={button.color}
                  size="small"
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "row",
                    gap: "4px",
                    textTransform: "unset",
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.15),
                    },
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
                    {t(`cluster.mapButtons.${button.label}`)}
                  </Typography>
                </Button>
              ))}
              <CopyButton
                color="primary"
                size="small"
                data={generateGoogleMapsUrl(lat, lng)}
                onClick={() => setCopyButtonClicked(true)}
                title={t("cluster.mapButtons.copy").toString()}
                iconProps={{
                  sx: {
                    fontSize: 16,
                  },
                }}
                sx={{
                  // display: "flex",
                  // flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.15),
                  },
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </PopupCard>
  );
};

ClusterPopup.displayName = "ClusterPopup";

export default ClusterPopup;
