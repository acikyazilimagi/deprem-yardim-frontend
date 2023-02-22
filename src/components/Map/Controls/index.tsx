import { HelpOutline } from "@mui/icons-material";
import {
  MapTypeMapLayerViewComponent,
  useMTMLView,
} from "../../MTMLView/MTMLView";
import { MapType } from "../../MTMLView/types";
import { AttributionComponent } from "../../Attributions/Attributions";
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
import { LocaleSwitchComponent } from "../../LocaleSwitch/LocaleSwitch";
// import SearchIcon from "@mui/icons-material/Search";
// import WifiTetheringErrorIcon from "@mui/icons-material/WifiTetheringError";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import { FilterButtonComponent } from "../../Button/Filter";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LayersIcon from "@mui/icons-material/Layers";
import { useMap } from "react-leaflet";
import { Control } from "./Control";
import { LayerButton } from "./LayerButton";
import {
  FilterComponent,
  IFilterElement,
  createUseFilter,
} from "../../Filter/Filter";
import { useHelpView } from "../../UserGuide/UserGuide";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { usePrevious } from "@/hooks/usePrevious";
import { useTranslation } from "next-i18next";
import { DoubleClickStopPropagation } from "@/components/DoubleClickStopPropagation";

export const usePoiFilter = createUseFilter();
// const useHelpFilter = createUseFilter(tempFilterData2);
// const useSearchFilter = createUseFilter(tempFilterData3);

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

interface IMapControlsProps {
  filters: {
    reasons: string[];
  };
}

const MapControls = (props: IMapControlsProps) => {
  const poiFilter = usePoiFilter();
  const router = useRouter();
  const { t } = useTranslation("home");

  const [poiFilters, setpoiFilters] = useState<IFilterElement[]>([]);

  const constructFilterElements = useCallback(
    (data: string[]) => {
      const queryReasons = (router.query.reasons as string | undefined) ?? "";

      const _data: IFilterElement[] = [
        {
          queryParam: "reasons",
          label: t("filter.reasonsTitle"),
          values: data,
          defaultValues: queryReasons
            .split(",")
            .map((reason) => data.indexOf(reason))
            .filter((index) => index > -1),
          type: "multi-select",
        },
      ];
      return _data;
    },
    [router.query.reasons, t]
  );

  useEffect(() => {
    setpoiFilters(constructFilterElements(props.filters.reasons));
  }, [constructFilterElements, props.filters.reasons]);

  const queryReasons = router.query.reasons as string | undefined;
  const prevReasons = usePrevious(queryReasons);

  useEffect(() => {
    if (queryReasons && queryReasons !== prevReasons) {
      poiFilter.setSelectedValues({ reasons: queryReasons.split(",") });
    }
  }, [poiFilter, prevReasons, queryReasons, router.query.reasons]);

  useEffect(() => {
    const query = new URLSearchParams(
      // @ts-ignore
      { ...router.query, ...poiFilter.selectedValues }
    ).toString();
    console.log("selected values", poiFilter.selectedValues);
    // FIXME: this will caouse an infinite loop if setpoiFilters depedency is added
    router.push({ query }, { query }, { shallow: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poiFilter.selectedValues]);

  return (
    <DoubleClickStopPropagation>
      <div>
        <Control position="topleft">
          <DoubleClickStopPropagation>
            <Stack display={"flex"} direction={"column"} rowGap={1}>
              <MapZoomControl />
              <MapLayerControl showOnly={"mobile"} />
              <HelpViewControl />
            </Stack>
          </DoubleClickStopPropagation>
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
              {/* <FilterButtonComponent
              buttonLabel="Afetzede Bul"
              icon={<SearchIcon />}
              onClick={() => {
                // searchFilter.toggle(!searchFilter.isOpen);
              }}
            /> */}
              {/* <FilterButtonComponent
              buttonLabel={t("filter.helpRequestTitle")}
              icon={<WifiTetheringErrorIcon />}
              onClick={() => {
                // poiFilter.toggle(!poiFilter.isOpen);
              }}
            /> */}

              <FilterButtonComponent
                buttonLabel={t("filter.servicesTitle")}
                icon={<Diversity1Icon />}
                onClick={() => {
                  poiFilter.toggle(!poiFilter.isOpen);
                }}
              />
            </Stack>
            <Stack display={"flex"} direction={"row"} columnGap={2}>
              {/* 
            <FilterComponent
              filterStore={useSearchFilter}
              filters={tempFilterData1}
            />
            */}

              {/* <FilterComponent
              filterStore={useHelpFilter}
              filters={tempFilterData2}
            />  */}
              {/* <FilterComponent
              title={t("filter.helpRequestTitle")}
              filterStore={usePoiFilter}
              filters={poiFilters}
            /> */}
              <FilterComponent
                title={t("filter.servicesTitle")}
                filterStore={usePoiFilter}
                filters={poiFilters}
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
      </div>
    </DoubleClickStopPropagation>
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
    "&:hover": {
      backgroundColor: theme.palette.common.white,
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
