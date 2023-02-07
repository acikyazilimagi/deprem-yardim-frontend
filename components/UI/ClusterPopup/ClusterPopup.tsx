import { useMapActions, usePopUpData } from "@/stores/mapStore";
import theme from "@/utils/theme";
import styled from "@emotion/styled";
import { Close } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import formatcoords from "formatcoords";
import { CopyButton } from "../Button/CopyButton";
import { generateGoogleMapsUrl, mapsButtons } from "../Drawer/Drawer";
import { findTagByClusterCount } from "../Tag/Tag.types";
import styles from "./ClusterPopup.module.css";

const ResponsiveChip = styled(Chip)`
  min-width: 20px !important;
  min-height: 20px !important;

  @media (max-width: ${theme.breakpoints.values.sm}px) {
    height: 20px;
    .MuiChip-label {
      display: none;
    }
  }
`;

const PopupCard = styled(Card)`
  position: absolute;
  bottom: 10px;
  left: 10px;
  cursor: pointer;
  z-index: 1000;
  font-size: 1rem;
  max-width: 400px;

  @media (max-width: ${theme.breakpoints.values.sm}px) {
    max-width: unset;
    right: 10px;
    .cluster-address {
      font-size: 13px;
    }
  }
`;

export function ClusterPopup() {
  const { setPopUpData } = useMapActions();
  const data = usePopUpData();
  const lat = data?.baseMarker.geometry.location.lat ?? 0;
  const lng = data?.baseMarker.geometry.location.lng ?? 0;
  const tag = findTagByClusterCount(data?.count ?? 0);

  if (!data) return null;

  return (
    <PopupCard variant="outlined">
      <CardContent sx={{ pb: 1, pt: 1 }}>
        <Grid container gap={1} alignItems="center">
          <Grid item xs="auto">
            <ResponsiveChip
              label={tag.intensity}
              style={{ background: tag.color }}
              sx={{ fontSize: theme.typography.pxToRem(12) }}
              size="small"
            />
          </Grid>
          <Grid item xs alignItems="center">
            <Typography variant="subtitle2" sx={{ py: 0 }}>
              {data?.count ?? 0} kişi enkaz altında
            </Typography>
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
        <Typography sx={{ pt: 1, pb: 1 }} className="cluster-address">
          {data?.baseMarker?.formatted_address}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            mb: 0,
            fontSize: theme.typography.pxToRem(13),
          }}
        >
          {formatcoords([lat, lng]).format()}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row">
          <Stack rowGap="8px" direction="row" className={styles.cardButtons}>
            {mapsButtons.map((button) => (
              <Button
                key={button.label}
                variant="outlined"
                color={button.color}
                size="small"
                endIcon={button.icon}
                style={{ textTransform: "unset" }}
                sx={{
                  mr: 1,
                }}
                onClick={() => button.urlCallback(lat, lng)}
              >
                {button.label}
              </Button>
            ))}
          </Stack>
          <Stack justifyContent="center">
            <CopyButton
              color="primary"
              data={generateGoogleMapsUrl(lat, lng)}
            />
          </Stack>
        </Stack>
      </CardActions>
    </PopupCard>
  );
}
