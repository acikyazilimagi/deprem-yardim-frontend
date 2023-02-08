import ClusterPopup from "@/components/UI/ClusterPopup";
import LoadingSpinner from "@/components/UI/Common/LoadingSpinner";
import RenderIf from "@/components/UI/Common/RenderIf";
import Drawer from "@/components/UI/Drawer/Drawer";
import FooterBanner from "@/components/UI/FooterBanner/FooterBanner";
import Maintenance from "@/components/UI/Maintenance/Maintenance";
import {
  CoordinatesURLParametersWithEventType,
  MarkerData,
} from "@/mocks/types";
import { dataFetcher } from "@/services/dataFetcher";
import { useCoordinates, useMapActions } from "@/stores/mapStore";
import styles from "@/styles/Home.module.css";
import { BASE_URL, REQUEST_THROTTLING_INITIAL_SEC } from "@/utils/constants";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import dynamic from "next/dynamic";
import useSWR from "swr";
// import { Partytown } from "@builder.io/partytown/react";
import Footer from "@/components/UI/Footer/Footer";
import useIncrementalThrottling from "@/hooks/useIncrementalThrottling";
import { Box } from "@mui/material";
import Head from "next/head";
import { useCallback, useEffect, useMemo, useState } from "react";

const LeafletMap = dynamic(() => import("@/components/UI/Map"), {
  ssr: false,
});

type Props = {
  deviceType: "mobile" | "desktop";
};

export default function Home({ deviceType }: Props) {
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
  const { error, isLoading, mutate, isValidating } = useSWR<
    MarkerData[] | undefined
  >(url, dataFetcher, {
    onLoadingSlow: () => setSlowLoading(true),
    revalidateOnFocus: false,
  });
  const { setDevice } = useMapActions();
  const [remainingTime, resetThrottling] = useIncrementalThrottling(
    mutate,
    REQUEST_THROTTLING_INITIAL_SEC
  );

  const handleScanButtonClick = useCallback(() => {
    setURL(BASE_URL + "?" + urlParams);
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

    setURL(BASE_URL + "?" + urlParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinatesAndEventType]);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <main className={styles.main}>
        {/* <HelpButton /> FooterBanner'a taşındı */}
        <Container maxWidth={false} disableGutters>
          <RenderIf condition={!error} fallback={<Maintenance />}>
            <LeafletMap />
            <Box
              sx={{
                position: "fixed",
                top: "50px",
                left: "50%",
                marginLeft: "-65.9px",
                zIndex: "9999",
                display: "flex",
                flexDirection: "column",
                rowGap: "8px",
              }}
            >
              <Button
                color="secondary"
                variant="contained"
                onClick={handleScanButtonClick}
              >
                Bu Alanı Tara
              </Button>
              <small className={styles.autoScanInfoText}>
                {remainingTime}sn sonra otomatik taranacak
              </small>
            </Box>
          </RenderIf>
          {(isLoading || isValidating) && (
            <LoadingSpinner slowLoading={slowLoading} />
          )}
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

  return {
    props: {
      deviceType: isMobile ? "mobile" : "desktop",
    },
  };
}
