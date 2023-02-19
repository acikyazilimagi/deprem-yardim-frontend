import HeadWithMeta from "@/components/base/HeadWithMeta/HeadWithMeta";
import ClusterPopup from "@/components/UI/ClusterPopup";
import Drawer from "@/components/UI/Drawer/Drawer";
import FilterMenu from "@/components/UI/FilterMenu/FilterMenu";
import Footer from "@/components/UI/Footer/Footer";
import FooterBanner from "@/components/UI/Footer/Banner";
import LocaleSwitch from "@/components/UI/I18n/LocaleSwitch";
import ScanAreaButton from "@/components/UI/Button/ScanArea";
import SitesIcon from "@/components/UI/SitesIcon/Icons";
import { useVerifiedLocations } from "@/hooks/useVerifiedLocations";
import { getLocationById } from "@/services/location";
import { useAreasActions, useShouldFetchNextOption } from "@/stores/areasStore";
import { useDevice, useMapActions } from "@/stores/mapStore";
import { useURLActions } from "@/stores/urlStore";
import styles from "@/styles/Home.module.css";
import { DeviceType } from "@/types";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LeafletMap = dynamic(() => import("@/components/UI/Map"), {
  ssr: false,
});

type Props = {
  deviceType: DeviceType;
  singleItemDetail: any;
  ahbap: any[];
};

export default function Home({ deviceType, singleItemDetail }: Props) {
  const {
    ahbapLocations,
    hospitalLocations,
    foodLocations,
    teleteyitLocations,
    satelliteLocations,
    sahraKitchenLocations,
    pharmacyLocations,
    safePlaceLocations,
  } = useVerifiedLocations();
  const { setTimeStamp } = useURLActions();
  const router = useRouter();
  const device = useDevice();

  const { setShouldFetchNextOption } = useAreasActions();
  const resetShouldFetchNextOption = () => setShouldFetchNextOption(false);
  const shouldFetchNextOption = useShouldFetchNextOption();

  const isMobile = device === "mobile";

  const { setDevice } = useMapActions();

  useEffect(() => {
    setDevice(deviceType);
  }, [deviceType, setDevice]);

  const onLanguageChange = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <>
      <HeadWithMeta singleItemDetail={singleItemDetail} />
      <main className={styles.main} id="prod-layout">
        <Container maxWidth={false} disableGutters>
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
                <FilterMenu.Channel />
                <FilterMenu.Time
                  onChangeTime={setTimeStamp}
                  shouldFetchNextOption={shouldFetchNextOption}
                  resetShouldFetchNextOption={resetShouldFetchNextOption}
                />
                <FilterMenu.Reason />
              </FilterMenu>
            </div>
          </div>
          <LeafletMap
            ahbap={ahbapLocations}
            hospital={hospitalLocations}
            food={foodLocations}
            teleteyit={teleteyitLocations}
            satellite={satelliteLocations}
            sahra_kitchen={sahraKitchenLocations}
            pharmacy={pharmacyLocations}
            safePlaces={safePlaceLocations}
          />
          {/* FIXME: move it to a component */}
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
          {/* FIXME: Move it to a component */}
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
            <ScanAreaButton />
          </Box>
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

  const itemDetail = await getLocationById(context.query.id);

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "home"])),
      deviceType: isMobile ? "mobile" : "desktop",
      ahbap: [],
      singleItemDetail: {
        ...itemDetail,
        ...context.query,
      },
    },
  };
}
