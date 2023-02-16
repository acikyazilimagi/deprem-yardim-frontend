import { useHelpView } from "@/newlayout/components/HelpViewComponent/HelpViewComponent";
import { HelpOutline } from "@mui/icons-material";
import {
  MapTypeMapLayerViewComponent,
  useMTMLView,
} from "../MTMLViewComponent/MTMLViewComponent";
import { MapType } from "../MTMLViewComponent/types";
import { AttributionComponent } from "../AttributionComponent/AttributionComponent";
import { LayerButton } from "@/components/UI/Drawer/components/LayerButton";
import {
  ButtonGroup,
  IconButton,
  Stack,
  SxProps,
  Theme,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import { LocaleSwitchComponent } from "../LocaleSwitchComponent/LocaleSwitchComponent";
import SearchIcon from "@mui/icons-material/Search";
import WifiTetheringErrorIcon from "@mui/icons-material/WifiTetheringError";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import { FilterButtonComponent } from "../FilterButtonComponent/FilterButtonComponent";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LayersIcon from "@mui/icons-material/Layers";
import { useMap } from "react-leaflet";
import { Control } from "./Control";

const typeImages: Record<MapType, string> = {
  [MapType.Default]: "default",
  [MapType.Satellite]: "satellite",
  [MapType.Terrain]: "terrain",
};
interface IStyles {
  [key: string]: SxProps<Theme>;
}
const MapControls: React.FC = () => {
  const parentMap = useMap();
  const helpView = useHelpView();
  const mtmlView = useMTMLView();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
      <Control position="topleft">
        <Box sx={styles.marginTopLeft}>
          <ButtonGroup
            sx={styles.button}
            size="small"
            orientation="vertical"
            aria-label="small button group"
          >
            <IconButton
              color="inherit"
              onClick={() => {
                parentMap.zoomIn();
              }}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => {
                parentMap.zoomOut();
              }}
            >
              <RemoveIcon />
            </IconButton>
          </ButtonGroup>
        </Box>
      </Control>
      <Control position="topleft">
        {!matches ? (
          <Box sx={styles.marginLeft}>
            <IconButton
              sx={styles.button}
              color="inherit"
              onClick={() => mtmlView.toggle(!mtmlView.isOpen)}
            >
              <LayersIcon />
            </IconButton>
          </Box>
        ) : null}
      </Control>
      <Control position="topleft">
        <Box sx={styles.marginLeft}>
          <IconButton
            sx={styles.button}
            color="inherit"
            onClick={() => {
              helpView.toggle(!helpView.isOpen);
            }}
          >
            <HelpOutline />
          </IconButton>
        </Box>
      </Control>
      <Control position="bottomleft">
        <MapTypeMapLayerViewComponent />
      </Control>
      <Control position="bottomleft">
        {matches ? (
          <LayerButton
            onClick={() => mtmlView.toggle(!mtmlView.isOpen)}
            image={typeImages[mtmlView.mapType]}
            checked={false}
          />
        ) : null}
      </Control>
      <Control position="topright">
        <Stack display={"flex"} direction={"row"} columnGap={2}>
          <FilterButtonComponent
            buttonLabel="Afetzede Bul"
            icon={<SearchIcon />}
            onClick={() => {
              console.log("falan");
            }}
          />
          <FilterButtonComponent
            buttonLabel="Yardim Talepleri"
            icon={<WifiTetheringErrorIcon />}
            onClick={() => {
              console.log("falan");
            }}
          />
          <FilterButtonComponent
            buttonLabel="Hizmetler"
            icon={<Diversity1Icon />}
            onClick={() => {
              console.log("falan");
            }}
          />
        </Stack>
      </Control>
      <Control position="bottomright">
        <Stack display={"flex"} direction={"row"}>
          <LocaleSwitchComponent />
        </Stack>
      </Control>
      <Control position="bottomright">
        <AttributionComponent />
      </Control>
    </>
  );
};

export default MapControls;

const styles: IStyles = {
  button: (theme: Theme) => ({
    backgroundColor: theme.palette.common.white,
    border: `solid 1px ${theme.palette.grey[300]}`,
    color: `${theme.palette.grey[700]} !important`,
    borderRadius: "8px !important",
    [theme.breakpoints.down("sm")]: {
      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    },
  }),
  marginTopLeft: {
    margin: "10px 10px",
  },
  marginLeft: {
    margin: "0px 0px 10px 10px",
  },
};
