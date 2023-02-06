import { usePopUpData } from "@/stores/mapStore";
import theme from "@/utils/theme";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import formatcoords from "formatcoords";
import { CopyButton } from "../Button/CopyButton";
import { findTagByClusterCount } from "../Tag/Tag.types";
import styles from "./ClusterPopup.module.css";

export interface ClusterPopupProps {
  data?: any;
}

function openGoogleMap(lat?: string | number, lng?: string | number) {
  window.open(`https://www.google.com/maps/@${lat},${lng},22z`, "_blank");
}

export function ClusterPopup() {
  const data = usePopUpData();
  const lat = data?.baseMarker.geometry.location.lat ?? 0;
  const lng = data?.baseMarker.geometry.location.lng ?? 0;
  const tag = findTagByClusterCount(data?.count ?? 0);

  if (!data) return null;

  return (
    <Card variant="outlined" className={styles.popupContainer}>
      <CardContent sx={{ pb: 1 }}>
        <Grid container>
          <Grid item xs>
            <Typography variant="subtitle2" sx={{ pb: 1, pt: 0.25 }}>
              {data?.count ?? 0} kişi enkaz altında
            </Typography>
          </Grid>
          <Grid item xs="auto">
            <Chip
              label={tag.intensity}
              style={{ background: tag.color }}
              sx={{ fontSize: theme.typography.pxToRem(12) }}
              size="small"
            />
          </Grid>
        </Grid>
        <Typography sx={{ pb: 1 }}>
          {data?.baseMarker?.formatted_address}
        </Typography>

        <Typography variant="subtitle2" sx={{ mb: 0 }}>
          {formatcoords([lat, lng]).format()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          color="primary"
          endIcon={<LaunchIcon fontSize="small" />}
          style={{ textTransform: "unset" }}
          sx={{
            mr: 2,
          }}
          onClick={() => openGoogleMap(lat, lng)}
        >
          Google Haritalar ile gör
        </Button>
        <CopyButton
          color="primary"
          data={`https://www.google.com/maps/@${lat},${lng},22z`}
        />
      </CardActions>
    </Card>
  );
}
