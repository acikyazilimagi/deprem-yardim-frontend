import { useHelpView } from "@/newlayout/components/HelpViewComponent/HelpViewComponent";
import { HelpOutline } from "@mui/icons-material";
import {
  MapTypeMapLayerViewComponent,
  useMTMLView,
} from "../MTMLViewComponent/MTMLViewComponent";
import { MapType } from "../MTMLViewComponent/types";
import { AttributionComponent } from "../AttributionComponent/AttributionComponent";
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
import { LayerButton } from "./LayerButton";
import {
  FilterComponent as SearchFilterComponent,
  IFilterElement,
  useFilter as useSearchFilter,
} from "../FilterComponent/FilterComponent";
import { useEffect } from "react";

const typeImages: Record<MapType, string> = {
  [MapType.Default]: "default",
  [MapType.Satellite]: "satellite",
  [MapType.Terrain]: "terrain",
};
interface IStyles {
  [key: string]: SxProps<Theme>;
}

const MapZoomControl = () => {
  const parentMap = useMap();
  return (
    <Box>
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
  );
};

interface IMapLayerControlProps {
  showOnly: "mobile" | "desktop";
}

const MapLayerControl = (props: IMapLayerControlProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const mtmlView = useMTMLView();

  return matches ? (
    props.showOnly === "desktop" ? (
      <LayerButton
        onClick={() => mtmlView.toggle(!mtmlView.isOpen)}
        image={typeImages[mtmlView.mapType]}
        checked={false}
      />
    ) : null
  ) : props.showOnly === "mobile" ? (
    <Box>
      <IconButton
        sx={styles.button}
        color="inherit"
        onClick={() => mtmlView.toggle(!mtmlView.isOpen)}
      >
        <LayersIcon />
      </IconButton>
    </Box>
  ) : null;
};

const HelpViewControl = () => {
  const helpView = useHelpView();
  return (
    <Box>
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
  );
};

const tempFilterData: IFilterElement[] = [
  {
    queryParam: "category-1",
    label: "foo-label-1",
    values: ["foo-1", "bar-1"],
    defaultValues: [0],
    type: "single-select",
  },
  {
    queryParam: "category-2",
    label: "foo-label-2",
    values: ["foo-2", "bar-2"],
    defaultValues: [0],
    type: "single-select",
  },
  {
    queryParam: "category-3",
    label: "foo-label-3",
    values: ["foo-3", "bar-3"],
    defaultValues: [1],
    type: "multi-select",
  },
];

const MapControls: React.FC = () => {
  const searchFilter = useSearchFilter();

  //#region TODO: redundant must be removed after service implementation
  useEffect(() => {
    searchFilter.setFilter(tempFilterData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //#endregion

  return (
    <>
      <Control position="topleft">
        <Stack display={"flex"} direction={"column"} rowGap={1}>
          <MapZoomControl />
          <MapLayerControl showOnly={"mobile"} />
          <HelpViewControl />
        </Stack>
      </Control>
      <Control position="bottomleft">
        <Stack display={"flex"} direction={"column"} rowGap={1}>
          <MapTypeMapLayerViewComponent />
          <MapLayerControl showOnly={"desktop"} />
        </Stack>
      </Control>
      <Control position="topright">
        <Stack
          display={"flex"}
          direction={"column"}
          rowGap={2}
          alignItems={"flex-end"}
        >
          <Stack display={"flex"} direction={"row"} columnGap={2}>
            <FilterButtonComponent
              buttonLabel="Afetzede Bul"
              icon={<SearchIcon />}
              onClick={() => {
                searchFilter.toggle(!searchFilter.isOpen);
              }}
            />
            <FilterButtonComponent
              buttonLabel="Yardim Talepleri"
              icon={<WifiTetheringErrorIcon />}
              onClick={() => {
                searchFilter.toggle(!searchFilter.isOpen);
              }}
            />
            <FilterButtonComponent
              buttonLabel="Hizmetler"
              icon={<Diversity1Icon />}
              onClick={() => {
                searchFilter.toggle(!searchFilter.isOpen);
              }}
            />
          </Stack>
          <Stack display={"flex"} direction={"row"} columnGap={2}>
            <SearchFilterComponent
              onChange={(event) => {
                // @ts-ignore TODO: URLSearchParams type is not working
                const queryParams = new URLSearchParams(event).toString();
                console.log("falan change", event, queryParams);
              }}
            />
          </Stack>
        </Stack>
      </Control>

      <Control position="bottomright">
        <Stack
          display={"flex"}
          direction={"column"}
          rowGap={1}
          alignItems={"flex-end"}
        >
          <Stack display={"flex"} direction={"row"}>
            <LocaleSwitchComponent />
          </Stack>
          <Stack display={"flex"} direction={"row"}>
            <AttributionComponent />
          </Stack>
        </Stack>
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
  pointerNone: {
    pointerEvents: "none",
  },
  pointerAll: {
    pointerEvents: "all",
  },
};
