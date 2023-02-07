import { ClusterPopup } from "@/components/UI/ClusterPopup/ClusterPopup";
import Drawer from "@/components/UI/Drawer/Drawer";
import FooterBanner from "@/components/UI/FooterBanner/FooterBanner";
import { MarkerData } from "@/mocks/types";
import { useMapActions } from "@/stores/mapStore";
import styles from "@/styles/Home.module.css";
import Container from "@mui/material/Container";
import dynamic from "next/dynamic";
import Head from "next/head";
import useSWR from "swr";
import { KeyboardEvent, MouseEvent, useCallback } from "react";
import { dataFetcher } from "@/services/dataFetcher";
import { BASE_URL } from "@/utils/constants";
import RenderIf from "@/components/UI/Common/RenderIf";
// import { Partytown } from "@builder.io/partytown/react";

const LeafletMap = dynamic(() => import("@/components/UI/Map"), {
  ssr: false,
});

const FallbackComponent = (
  <h2>
    Teknik bir aksaklık söz konusu. Sistem kısa zamanda devreye girecektir
  </h2>
);

export default function Home() {
  const {
    data: results,
    isLoading,
    error,
  } = useSWR<MarkerData[] | undefined>(BASE_URL, dataFetcher);

  const { toggleDrawer, setDrawerData, setPopUpData } = useMapActions();

  const handleMarkerClick = useCallback(
    (event: KeyboardEvent | MouseEvent, markerData?: MarkerData) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      )
        return;

      toggleDrawer();

      if (markerData) {
        setDrawerData(markerData);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const togglePopUp = useCallback(
    (e: any) => {
      const markers = e.layer.getAllChildMarkers();
      setPopUpData({
        count: markers.length ?? 0,
        baseMarker: markers[0].options.markerData,
        markers: markers,
      });
    },
    [setPopUpData]
  );

  return (
    <>
      <Head>
        {/* <Partytown debug={true} forward={["dataLayer.push"]} /> */}
        <title>Afet Haritası | Anasayfa</title>
        <meta
          name="description"
          content="Twitter, Instagram, Whatsapp ve çeşitli web siteleri gibi farklı kaynaklardan gelen tüm yardım çağrılarını topluyoruz ve bu veriyi sahada kullanılmak üzere anlamlı, rafine hale getiriyoruz. Amacımız bilgi teknolojilerini kullanarak ilgili kurum ve STK'lara yardımcı olmak ve afet zamanlarında açık bir veri platformu sağlamak.
"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <HelpButton /> FooterBanner'a taşındı */}
        <Container maxWidth={false} disableGutters>
          <RenderIf
            condition={error ? false : true}
            fallback={FallbackComponent}
          >
            <LeafletMap
              data={isLoading || !results ? [] : results}
              onClusterClick={togglePopUp}
              // @ts-expect-error
              onClickMarker={handleMarkerClick}
            />
          </RenderIf>
        </Container>
        <Drawer toggler={handleMarkerClick} />
        <ClusterPopup />
        <FooterBanner />
      </main>
    </>
  );
}
