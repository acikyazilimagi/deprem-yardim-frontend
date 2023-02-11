import { useCallback, useEffect, useRef, useState } from "react";
import ClusterPopup from "@/components/UI/ClusterPopup";
import LoadingSpinner from "@/components/UI/Common/LoadingSpinner";
import RenderIf from "@/components/UI/Common/RenderIf";
import Drawer from "@/components/UI/Drawer/Drawer";
import FooterBanner from "@/components/UI/FooterBanner/FooterBanner";
import SitesIcon from "@/components/UI/SitesIcon/Icons";
import { MaintenanceError } from "@/errors";
import {
  CoordinatesURLParametersWithEventType,
  DeviceType,
} from "@/mocks/types";
import { dataFetcher } from "@/services/dataFetcher";
import {
  useCoordinates,
  useMapActions,
  setMarkerData,
  useDevice,
} from "@/stores/mapStore";
import styles from "@/styles/Home.module.css";
import {
  AHBAP_LOCATIONS_URL,
  REQUEST_THROTTLING_INITIAL_SEC,
} from "@/utils/constants";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import dynamic from "next/dynamic";
import useSWR, { mutate } from "swr";
import Footer from "@/components/UI/Footer/Footer";
import useIncrementalThrottling from "@/hooks/useIncrementalThrottling";
import { Box } from "@mui/material";
import { dataTransformerLite } from "@/utils/dataTransformer";
import { DataLite } from "@/mocks/TypesAreasEndpoint";
import { areasURL, locationsURL } from "@/utils/urls";
import HeadWithMeta from "@/components/base/HeadWithMeta/HeadWithMeta";
import FilterMenu from "@/components/UI/FilterMenu/FilterMenu";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation, Trans } from "next-i18next";
import {
  initialReasoningFilter,
  ReasoningFilterMenuOption,
} from "@/components/UI/FilterMenu/FilterReasoningMenu";
import { useRouter } from "next/router";
import LocaleSwitch from "@/components/UI/I18n/LocaleSwitch";
import { multiChannelDataFetcher } from "@/services/multiChannelDataFetcher";

const LeafletMap = dynamic(() => import("@/components/UI/Map"), {
  ssr: false,
});

const getReasoningFilter = (
  reasoningFilterMenuOption: ReasoningFilterMenuOption
) => {
  if (reasoningFilterMenuOption.type === "channel") {
    return undefined;
  }

  if (reasoningFilterMenuOption.type === "reason") {
    return reasoningFilterMenuOption.value;
  }
};

type Props = {
  deviceType: DeviceType;
  singleItemDetail: any;
  ahbap: any[];
};

export default function Home({ deviceType, singleItemDetail }: Props) {
  const { t } = useTranslation(["common", "home"]);
  const router = useRouter();
  const [slowLoading, setSlowLoading] = useState(false);
  const [reasoningFilterMenuOption, setReasoningFilterMenuOption] =
    useState<ReasoningFilterMenuOption>(initialReasoningFilter);
  const [newerThanTimestamp, setNewerThanTimestamp] = useState<
    number | undefined
  >(undefined);
  const [shouldFetchNextOption, setShouldFetchNextOption] =
    useState<boolean>(false);
  const [verifiedStatus, setVerifiedStatus] = useState(["verified"]);
  const device = useDevice();
  const isMobile = device === "mobile";
  const urlParams = useRef(new URLSearchParams());
  const requestURL = useRef("");

  const [ahbapLocations, setAhbapLocations] = useState<any[]>([]);

  const setRequestURLandMutate = () => {
    requestURL.current = `${areasURL}?${urlParams.current.toString()}`;
    mutate(requestURL.current);
  };

  const coordinatesAndEventType:
    | CoordinatesURLParametersWithEventType
    | undefined = useCoordinates();

  const resetShouldFetchNextOption = () => setShouldFetchNextOption(false);

  const { error, isLoading, isValidating } = useSWR<DataLite | undefined>(
    requestURL.current,
    // If both verified / unverified are selected, use multiChannelDataFetcher which
    // fetches both twitter and babala
    verifiedStatus.length > 1 ? multiChannelDataFetcher : dataFetcher,
    {
      isPaused: () => !coordinatesAndEventType,
      onLoadingSlow: () => setSlowLoading(true),
      revalidateOnFocus: false,
      onSuccess: async (data) => {
        if (!data) return;
        if (!data.results) {
          setShouldFetchNextOption(true);
        }

        const transformedData = data.results
          ? await dataTransformerLite(data)
          : [];
        setMarkerData(transformedData);
      },
    }
  );

  useSWR(
    // Do not fetch Ahbap if verified is not selected
    verifiedStatus.includes("verified") && AHBAP_LOCATIONS_URL,
    dataFetcher,
    {
      onSuccess: (data) => {
        if (!data) return;
        const features = data.results.map((item: any) => {
          let extra_params = {};
          try {
            extra_params = JSON.parse(
              item.extra_parameters
                ?.replaceAll("'", '"')
                .replaceAll("\\xa0", "")
            );
          } catch (error) {
            console.error(error);
          }

          return {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: item.loc?.reverse(),
            },
            properties: extra_params,
          };
        });
        setAhbapLocations(features);
      },
    }
  );

  if (error) {
    console.log(error);
    throw new MaintenanceError(t("common:errors.maintenance").toString());
  }

  const { setDevice } = useMapActions();
  const [remainingTime, resetThrottling] = useIncrementalThrottling(() => {
    setCoordinatesURLParams();
    setRequestURLandMutate();
  }, REQUEST_THROTTLING_INITIAL_SEC);

  const handleScanButtonClick = () => {
    setCoordinatesURLParams();
    setRequestURLandMutate();
    resetThrottling();
  };

  const setCoordinatesURLParams = useCallback(() => {
    if (!coordinatesAndEventType) {
      return;
    }
    urlParams.current.set("ne_lat", coordinatesAndEventType?.ne_lat.toString());
    urlParams.current.set("ne_lng", coordinatesAndEventType?.ne_lng.toString());
    urlParams.current.set("sw_lat", coordinatesAndEventType?.sw_lat.toString());
    urlParams.current.set("sw_lng", coordinatesAndEventType?.sw_lng.toString());
  }, [coordinatesAndEventType]);

  useEffect(() => {
    setDevice(deviceType);
  }, [deviceType, setDevice]);

  // Set the URL once the map is ready
  useEffect(() => {
    resetThrottling();
    if (coordinatesAndEventType?.eventType !== "ready") {
      return;
    }

    setCoordinatesURLParams();
    setRequestURLandMutate();
  }, [coordinatesAndEventType, setCoordinatesURLParams, resetThrottling]);

  // Set reason URL param
  useEffect(() => {
    const reasoningFilterValue = getReasoningFilter(reasoningFilterMenuOption);
    if (reasoningFilterValue) {
      urlParams.current.set("reason", reasoningFilterValue);
    } else {
      urlParams.current.delete("reason");
    }

    setRequestURLandMutate();
  }, [reasoningFilterMenuOption]);

  // Set time_stamp URL param
  useEffect(() => {
    if (!newerThanTimestamp) {
      return;
    }
    urlParams.current.set("time_stamp", newerThanTimestamp.toString());

    setRequestURLandMutate();
  }, [newerThanTimestamp]);

  // Set channel URL param
  useEffect(() => {
    if (verifiedStatus.includes("verified")) {
      urlParams.current.set("channel", "babala");
    } else if (verifiedStatus.includes("unverified")) {
      setAhbapLocations([]);
      urlParams.current.set("channel", "twitter");
    } else {
      setAhbapLocations([]);
      urlParams.current.delete("channel");
    }

    setRequestURLandMutate();
  }, [verifiedStatus]);

  const onLanguageChange = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <>
      <HeadWithMeta singleItemDetail={singleItemDetail} />
      <main className={styles.main}>
        <Container maxWidth={false} disableGutters>
          <RenderIf condition={!error}>
            <div
              style={{
                position: "fixed",
                right: "10px",
                top: "15px",
                zIndex: "502",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 2,
                }}
              >
                <FilterMenu>
                  <FilterMenu.Reasoning
                    onChange={setReasoningFilterMenuOption}
                  />
                  <FilterMenu.Time
                    onChangeTime={setNewerThanTimestamp}
                    shouldFetchNextOption={shouldFetchNextOption}
                    resetShouldFetchNextOption={resetShouldFetchNextOption}
                  />
                  <FilterMenu.FilterVerifiedMenu onChange={setVerifiedStatus} />
                </FilterMenu>
              </div>
            </div>
            <LeafletMap ahbap={ahbapLocations} />
            <Box
              sx={{
                display: "flex",
                padding: "0",
                borderRadius: "10px",
                position: "absolute",
                bottom: isMobile ? "30px" : "90px",
                right: isMobile ? "10px" : "26px",
                zIndex: 500,
              }}
            >
              <LocaleSwitch
                current={router.locale || "tr"}
                onChange={onLanguageChange}
                mobile={isMobile}
              />
            </Box>
            {!isMobile && <SitesIcon></SitesIcon>}
            <Box
              sx={{
                position: "fixed",
                top: { md: "15px" },
                bottom: { xs: "88px", md: "unset" },
                left: "50%",
                marginLeft: "-105px",
                zIndex: "502",
                display: "flex",
                flexDirection: "column",
                rowGap: "8px",
                width: "210px",
              }}
            >
              <Button
                color="secondary"
                variant="contained"
                onClick={handleScanButtonClick}
              >
                {isLoading || isValidating ? (
                  <LoadingSpinner slowLoading={slowLoading} />
                ) : (
                  <span>{t("home:scanner.text")}</span>
                )}
              </Button>
              <small className={styles.autoScanInfoTextIndex}>
                <Trans
                  i18nKey="home:scanner.remaining"
                  values={{ time: remainingTime }}
                />
              </small>
            </Box>
          </RenderIf>
        </Container>
        <Drawer />
        <ClusterPopup />
        <FooterBanner />
        <Footer />
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const UA = context.req.headers["user-agent"];
  const isMobile = Boolean(
    UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  let itemDetail = {};
  if (context.query.id) {
    const url = locationsURL(context.query.id) as string;
    itemDetail = await dataFetcher(url);
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "home"])),
      deviceType: isMobile ? "mobile" : "desktop",
      ahbap: [],
      singleItemDetail: context.query.id
        ? { ...itemDetail, ...context.query }
        : {},
    },
  };
}
