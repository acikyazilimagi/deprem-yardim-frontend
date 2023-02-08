import ClusterPopup from "@/components/UI/ClusterPopup";
import RenderIf from "@/components/UI/Common/RenderIf";
import LoadingSpinner from "@/components/UI/Common/LoadingSpinner";
import TechnicalError from "@/components/UI/Common/TechnicalError";
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
import Head from "@/components/UI/Head/Head";
// import { Partytown } from "@builder.io/partytown/react";
import Footer from "@/components/UI/Footer/Footer";
import React, { useEffect, useState } from "react";

const LeafletMap = dynamic(() => import("@/components/UI/Map"), {
  ssr: false,
});

type Props = {
  deviceType: "mobile" | "desktop";
};

export default function Home({ deviceType }: Props) {
  const [slowLoading, setSlowLoading] = useState(false);
  const [url, setURL] = useState(BASE_URL);
  const coordinates: CoordinatesURLParameters | undefined = useCoordinates();

  useEffect(() => {
    const urlParams = new URLSearchParams(coordinates as any).toString();

    if (!urlParams) return;

    setURL(BASE_URL + "?" + urlParams);
  }, [coordinates]);

  const { error, isLoading } = useSWR<MarkerData[] | undefined>(
    url,
    dataFetcher,
    { onLoadingSlow: () => setSlowLoading(true) }
  );

  const { setDevice } = useMapActions();
  setDevice(deviceType);

  return (
    <>
      <Head />
      <main className={styles.main}>
        {/* <HelpButton /> FooterBanner'a taşındı */}
        <Container maxWidth={false} disableGutters>
          <RenderIf condition={!error} fallback={<TechnicalError />}>
            <LeafletMap />
          </RenderIf>
          {isLoading && <LoadingSpinner slowLoading={slowLoading} />}
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
