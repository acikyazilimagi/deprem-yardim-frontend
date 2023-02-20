import {
  Box,
  Card,
  CardContent,
  Container,
  Fade,
  IconButton,
  Stack,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "next-i18next";
import {
  MapLayer,
  MapType,
} from "@/newlayout/components/MTMLViewComponent/types";
import { LayerButton } from "../map/LayerButton";

interface IStyles {
  [key: string]: SxProps<Theme>;
}

type MTMLViewStore = {
  isOpen: boolean;
  mapType: MapType;
  mapLayers: MapLayer[];
  toggle: (_checked: boolean) => void;
  setMapType: (_type: MapType) => void;
  toggleMapLayer: (_layer: MapLayer) => void;
};

export const useMTMLView = create<MTMLViewStore>()(
  devtools(
    (set) => ({
      isOpen: false,
      mapType: MapType.Default,
      mapLayers: [MapLayer.Markers, MapLayer.Heatmap],
      toggle: (checked: boolean) =>
        set(() => ({ isOpen: checked }), undefined, { type: "set" }),
      setMapType: (type: MapType) =>
        set(() => ({ mapType: type }), undefined, { type: "set" }),
      toggleMapLayer: (layer: MapLayer) =>
        set(
          ({ mapLayers }) => ({
            mapLayers: mapLayers.includes(layer)
              ? mapLayers.filter((l) => l !== layer)
              : [...mapLayers, layer],
          }),
          undefined,
          { type: "set" }
        ),
    }),
    { name: "MTMLViewStore" }
  )
);

export const MapTypeMapLayerViewComponent = () => {
  const { isOpen, toggle, setMapType, mapType, mapLayers, toggleMapLayer } =
    useMTMLView();
  const { t } = useTranslation("home");
  if (!isOpen) return null;
  return (
    <Fade in={isOpen}>
      <Container sx={styles.container}>
        <Box>
          <Card sx={styles.card}>
            <CardContent>
              <IconButton
                sx={{ float: "right" }}
                aria-label="close"
                onClick={() => toggle(false)}
              >
                <CloseIcon />
              </IconButton>
              <Typography fontSize="18px" sx={{ paddingTop: "1rem" }}>
                {t("map.type")}
              </Typography>
              <Stack direction={"row"} gap={4} sx={styles.mapType}>
                <LayerButton
                  onClick={() => setMapType(MapType.Default)}
                  image="default"
                  checked={mapType === MapType.Default}
                  title={t("map.base.default")}
                />
                <LayerButton
                  onClick={() => setMapType(MapType.Satellite)}
                  image="satellite"
                  checked={mapType === MapType.Satellite}
                  title={t("map.base.satellite")}
                />
                <LayerButton
                  onClick={() => setMapType(MapType.Terrain)}
                  image="terrain"
                  checked={mapType === MapType.Terrain}
                  title={t("map.base.terrain")}
                />
              </Stack>
              <Typography fontSize="18px">{t("map.details")}</Typography>
              <Stack direction={"row"} gap={4} sx={styles.mapDetails}>
                <LayerButton
                  onClick={() => toggleMapLayer(MapLayer.Markers)}
                  image="markers"
                  checked={mapLayers.includes(MapLayer.Markers)}
                  title={t("map.layer.markers")}
                />
                <LayerButton
                  onClick={() => toggleMapLayer(MapLayer.Heatmap)}
                  image="heatmap"
                  checked={mapLayers.includes(MapLayer.Heatmap)}
                  title={t("map.layer.heatmap")}
                />
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Fade>
  );
};
//#region styles
const styles: IStyles = {
  container: (theme: Theme) => ({
    padding: "0 !important",
    pointerEvents: "all",
    [theme.breakpoints.up("xs")]: {
      width: "100vw",
    },
    [theme.breakpoints.up("sm")]: {
      width: "unset",
    },
  }),
  card: (theme: Theme) => ({
    [theme.breakpoints.up("xs")]: {
      maxWidth: "100%",
      height: "50vh",
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: 290,
      height: "auto",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: 290,
      height: "auto",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: 290,
      height: "auto",
    },
    [theme.breakpoints.up("xl")]: {
      maxWidth: 290,
      height: "auto",
    },
  }),
  mapType: () => ({
    display: "flex",
    alignItems: "flex-start",
    margin: "0.5rem 0 1rem",
    borderBottom: "1px solid #ddd",
    paddingBottom: "1rem",
  }),
  mapDetails: () => ({
    display: "flex",
    alignItems: "flex-start",
    margin: "0.5rem 0 0",
    flexWrap: "wrap",
  }),
};
//#endregion
