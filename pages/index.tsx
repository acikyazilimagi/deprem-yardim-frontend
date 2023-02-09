import ClusterPopup from "@/components/UI/ClusterPopup";
import LoadingSpinner from "@/components/UI/Common/LoadingSpinner";
import RenderIf from "@/components/UI/Common/RenderIf";
import Drawer from "@/components/UI/Drawer/Drawer";
import FooterBanner from "@/components/UI/FooterBanner/FooterBanner";
import SitesIcon from "@/components/UI/SitesIcon/Icons";
import Maintenance from "@/components/UI/Maintenance/Maintenance";
import {
  CoordinatesURLParametersWithEventType,
  DeviceType,
} from "@/mocks/types";
import { dataFetcher } from "@/services/dataFetcher";
import {
  useCoordinates,
  useMapActions,
  setMarkerData,
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
import { areasURL, locationsURL } from "@/utils/urls";
import HeadWithMeta from "@/components/base/HeadWithMeta/HeadWithMeta";

const LeafletMap = dynamic(() => import("@/components/UI/Map"), {
  ssr: false,
});

type Props = {
  deviceType: DeviceType;
  singleItemDetail: any;
};
export default function Home({ deviceType, singleItemDetail }: Props) {
  const [slowLoading, setSlowLoading] = useState(false);

  const [url, setURL] = useState<string | null>(null);
  const coordinatesAndEventType:
    | CoordinatesURLParametersWithEventType
    | undefined = useCoordinates();
  const urlParams = useMemo(
    () =>
      new URLSearchParams({
        ne_lat: coordinatesAndEventType?.ne_lat,
        ne_lng: coordinatesAndEventType?.ne_lng,
        sw_lat: coordinatesAndEventType?.sw_lat,
        sw_lng: coordinatesAndEventType?.sw_lng,
      } as any).toString(),
    [
      coordinatesAndEventType?.ne_lat,
      coordinatesAndEventType?.ne_lng,
      coordinatesAndEventType?.sw_lat,
      coordinatesAndEventType?.sw_lng,
    ]
  );
  const { error, isLoading, isValidating } = useSWR<DataLite | undefined>(
    url,
    dataFetcher,
    {
      onLoadingSlow: () => setSlowLoading(true),
      revalidateOnFocus: false,
      onSuccess: (data) => {
        if (!data) return;

        const transformedData = data.results ? dataTransformerLite(data) : [];
        setMarkerData(transformedData);
      },
    }
  );

  const { setDevice } = useMapActions();
  const [remainingTime, resetThrottling] = useIncrementalThrottling(
    () => setURL(areasURL + "?" + urlParams),
    REQUEST_THROTTLING_INITIAL_SEC
  );

  const handleScanButtonClick = useCallback(() => {
    setURL(areasURL + "?" + urlParams);
    resetThrottling();
  }, [resetThrottling, urlParams]);

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
      return;
    }

    setURL(areasURL + "?" + urlParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinatesAndEventType]);

  return (
    <>
      <HeadWithMeta singleItemDetail={singleItemDetail} />
      <main className={styles.main}>
        <Container maxWidth={false} disableGutters>
          <RenderIf condition={!error} fallback={<Maintenance />}>
            <LeafletMap />
            <SitesIcon />
            <Box
              sx={{
                position: "fixed",
                top: "15px",
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
                  "ALANI TARA"
                )}
              </Button>
              <small className={styles.autoScanInfoTextIndex}>
                {remainingTime} sn sonra otomatik taranacak
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
