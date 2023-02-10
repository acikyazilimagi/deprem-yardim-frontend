import ClusterPopup from "@/components/UI/ClusterPopup";
import LoadingSpinner from "@/components/UI/Common/LoadingSpinner";
import RenderIf from "@/components/UI/Common/RenderIf";
import Drawer from "@/components/UI/Drawer/Drawer";
import FooterBanner from "@/components/UI/FooterBanner/FooterBanner";

import ReasoningFilterMenu, {
  initialReasoningFilter,
  ReasoningFilterMenuOption,
} from "@/components/UI/ReasoningFilterMenu";
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
import { REQUEST_THROTTLING_INITIAL_SEC } from "@/utils/constants";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import dynamic from "next/dynamic";
import useSWR from "swr";
import Footer from "@/components/UI/Footer/Footer";
import useIncrementalThrottling from "@/hooks/useIncrementalThrottling";
import { Box } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { dataTransformerLite } from "@/utils/dataTransformer";
import { DataLite } from "@/mocks/TypesAreasEndpoint";
import FilterTimeMenu from "@/components/UI/FilterTimeMenu/FilterTimeMenu";
import { areasURL, locationsURL } from "@/utils/urls";
import HeadWithMeta from "@/components/base/HeadWithMeta/HeadWithMeta";

const LeafletMap = dynamic(() => import("@/components/UI/Map"), {
  ssr: false,
});

const getReasoningFilter = (
  reasoningFilterMenuOption: ReasoningFilterMenuOption
) => {
  reasoningFilterMenuOption.type;
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
};
export default function Home({ deviceType, singleItemDetail }: Props) {
  const [slowLoading, setSlowLoading] = useState(false);
  const [reasoningFilterMenuOption, setReasoningFilterMenuOption] =
    useState<ReasoningFilterMenuOption>(initialReasoningFilter);
  const [newerThanTimestamp, setNewerThanTimestamp] = useState<
    number | undefined
  >(undefined);
  const [url, setUrl] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState<string>("");
  const device = useDevice();
  const isMobile = device === "mobile";

  const coordinatesAndEventType:
    | CoordinatesURLParametersWithEventType
    | undefined = useCoordinates();

  const urlParams = useMemo(() => {
    const reasoningFilterValue = getReasoningFilter(reasoningFilterMenuOption);
    return new URLSearchParams({
      ne_lat: coordinatesAndEventType?.ne_lat,
      ne_lng: coordinatesAndEventType?.ne_lng,
      sw_lat: coordinatesAndEventType?.sw_lat,
      sw_lng: coordinatesAndEventType?.sw_lng,
      time_stamp: newerThanTimestamp ? newerThanTimestamp : undefined,
      ...(reasoningFilterValue ? { reason: reasoningFilterValue } : {}),
    } as any).toString();
  }, [
    coordinatesAndEventType?.ne_lat,
    coordinatesAndEventType?.ne_lng,
    coordinatesAndEventType?.sw_lat,
    coordinatesAndEventType?.sw_lng,
    newerThanTimestamp,
    reasoningFilterMenuOption,
  ]);

  const { error, isLoading, isValidating, mutate } = useSWR<
    DataLite | undefined
  >(url, dataFetcher, {
    isPaused: () => !coordinatesAndEventType,
    onLoadingSlow: () => setSlowLoading(true),
    revalidateOnFocus: false,
    onSuccess: (data) => {
      if (!data) return;

      const transformedData = data.results ? dataTransformerLite(data) : [];
      setMarkerData(transformedData);
    },
  });

  if (error) {
    throw new MaintenanceError(
      "Bu sayfa sizlere daha iyi hizmet verebilmek için bakımdadır. Lütfen daha sonra tekrar deneyin veya DepremYardim.com'u ziyaret edin."
    );
  }

  const { setDevice } = useMapActions();
  const [remainingTime, resetThrottling] = useIncrementalThrottling(() => {
    setUrl(areasURL + "?" + urlParams);
  }, REQUEST_THROTTLING_INITIAL_SEC);

  const handleScanButtonClick = useCallback(() => {
    if (nextUrl.length) {
      setUrl(nextUrl);
      setNextUrl("");
    } else {
      mutate();
    }
    resetThrottling();
  }, [resetThrottling, mutate, setUrl, nextUrl, setNextUrl]);

  useEffect(() => {
    setDevice(deviceType);
  }, [deviceType, setDevice]);

  useEffect(() => {
    if (
      typeof coordinatesAndEventType === "undefined" ||
      !urlParams ||
      coordinatesAndEventType?.eventType === "moveend" ||
      coordinatesAndEventType?.eventType === "zoomend"
    ) {
      resetThrottling();
      setNextUrl(areasURL + "?" + urlParams);
      return;
    }

    setUrl(areasURL + "?" + urlParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinatesAndEventType]);

  useEffect(() => {
    setUrl(areasURL + "?" + urlParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newerThanTimestamp]);

  useEffect(() => {
    if (url) {
      const _url = new URL(url);
      const params = new URLSearchParams(urlParams);

      setUrl(`${_url.origin}${_url.pathname}?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reasoningFilterMenuOption]);

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
                <ReasoningFilterMenu onChange={setReasoningFilterMenuOption} />
                <FilterTimeMenu onChangeTime={setNewerThanTimestamp} />
              </div>
            </div>
            <LeafletMap />
            {!isMobile && <SitesIcon />}
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
                  <span>ALANI TARA</span>
                )}
              </Button>
              <small className={styles.autoScanInfoTextIndex}>
                <strong>{remainingTime}</strong>
                <span> sn sonra otomatik taranacak</span>
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
      deviceType: isMobile ? "mobile" : "desktop",
      singleItemDetail: context.query.id
        ? { ...itemDetail, ...context.query }
        : {},
    },
  };
}
