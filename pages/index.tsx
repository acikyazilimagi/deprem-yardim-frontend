import ClusterPopup from "@/components/UI/ClusterPopup";
import RenderIf from "@/components/UI/Common/RenderIf";
import LoadingSpinner from "@/components/UI/Common/LoadingSpinner";
import Drawer from "@/components/UI/Drawer/Drawer";
import FooterBanner from "@/components/UI/FooterBanner/FooterBanner";
import { CoordinatesURLParameters, MarkerData } from "@/mocks/types";
import { dataFetcher } from "@/services/dataFetcher";
import { useMapActions, useCoordinates } from "@/stores/mapStore";
import styles from "@/styles/Home.module.css";
import { BASE_URL } from "@/utils/constants";
import Container from "@mui/material/Container";
import dynamic from "next/dynamic";
import useSWR from "swr";
import Maintenance from "@/components/UI/Maintenance/Maintenance";
// import { Partytown } from "@builder.io/partytown/react";
import Footer from "@/components/UI/Footer/Footer";
import React, { useEffect, useState } from "react";
import HeadWithMeta from "@/components/base/HeadWithMeta/HeadWithMeta";

const LeafletMap = dynamic(() => import("@/components/UI/Map"), {
  ssr: false,
});

type Props = {
  deviceType: "mobile" | "desktop";
};

export default function Home({ deviceType }: Props) {
  const [slowLoading, setSlowLoading] = useState(false);

  const [url, setURL] = useState<string | null>(null);
  const coordinates: CoordinatesURLParameters | undefined = useCoordinates();
  const [sendRequest, setSendRequest] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(coordinates as any).toString();

    if (!urlParams || !sendRequest) return;

    setURL(BASE_URL + "?" + urlParams);
    setSendRequest(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates]);

  const triggerAPIRequest = () => {
    setSendRequest(true);
  };

  const { error, isLoading } = useSWR<MarkerData[] | undefined>(
    url,
    dataFetcher,
    { onLoadingSlow: () => setSlowLoading(true) }
  );

  const { setDevice } = useMapActions();
  setDevice(deviceType);

  return (
    <>
      <HeadWithMeta />
      <main className={styles.main}>
        {/* <HelpButton /> FooterBanner'a taşındı */}
        <Container maxWidth={false} disableGutters>
          <RenderIf condition={!error} fallback={<Maintenance />}>
            <LeafletMap />
          </RenderIf>
          {isLoading && <LoadingSpinner slowLoading={slowLoading} />}
        </Container>
        <Drawer />
        <ClusterPopup />
        <FooterBanner triggerAPIRequest={triggerAPIRequest} />
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
