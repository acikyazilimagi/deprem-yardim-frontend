import HeadWithMeta from "@/components/base/HeadWithMeta/HeadWithMeta";
import ClusterPopup from "@/components/UI/ClusterPopup";
import { Drawer as NewDrawer } from "@/components/UI/Drawer/NewDrawer";
import Drawer from "@/components/UI/Drawer/Drawer";
import FilterMenu from "@/components/UI/FilterMenu/FilterMenu";
import Footer from "@/components/UI/Footer/Footer";
import FooterBanner from "@/components/UI/Footer/Banner";
import LocaleSwitch from "@/components/UI/I18n/LocaleSwitch";
import ScanAreaButton from "@/components/UI/Button/ScanArea";
import SitesIcon from "@/components/UI/SitesIcon/Icons";
import {
  transformers,
  useVerifiedLocations,
} from "@/hooks/useVerifiedLocations";
import { getLocationById } from "@/services/location";
import { useAreasActions, useShouldFetchNextOption } from "@/stores/areasStore";
import { MapLayer, useDevice, useMapActions } from "@/stores/mapStore";
import { useChannelFilterMenuOption, useURLActions } from "@/stores/urlStore";
import styles from "@/styles/Home.module.css";
import { APIChannel, APIResponse, ChannelData, DeviceType } from "@/types";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { parseChannelData } from "@/hooks/useLocation";

const LeafletMap = dynamic(() => import("@/components/UI/Map"), {
  ssr: false,
});

type Props = {
  deviceType: DeviceType;
  singleItemDetail: APIResponse;
  channel: ChannelData;
};

export default function Home({ deviceType, singleItemDetail, channel }: Props) {
  // gather location data from all channels
  const channelFilter = useChannelFilterMenuOption();

  const {
    ahbapLocations,
    hospitalLocations,
    foodLocations,
    teleteyitLocations,
    satelliteLocations,
    sahraKitchenLocations,
    pharmacyLocations,
    safePlaceLocations,
    twitterLocations,
    babalaLocations,
  } = useVerifiedLocations();

  const router = useRouter();

  const onLanguageChange = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  // adds timestamp param to the URL query if data is from babala
  const { setTimeStamp } = useURLActions();

  // FIXME: device handling, kinda weird how this is handled right now...
  const device = useDevice();
  const isMobile = device === "mobile";
  const { setDevice } = useMapActions();
  useEffect(() => {
    setDevice(deviceType);
  }, [deviceType, setDevice]);

  // supposed to handle re-fetching after filter selection (FIXME: FilterTimeMenu.tsx)
  const { setShouldFetchNextOption } = useAreasActions();
  const resetShouldFetchNextOption = () => setShouldFetchNextOption(false);
  const shouldFetchNextOption = useShouldFetchNextOption();

  // global error handling from location data fetching
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
            locations={{
              [MapLayer.Ahbap]: ahbapLocations,
              [MapLayer.Food]: foodLocations,
              [MapLayer.Hospital]: hospitalLocations,
              [MapLayer.Satellite]: satelliteLocations,
              [MapLayer.SahraMutfak]: sahraKitchenLocations,
              [MapLayer.Pharmacy]: pharmacyLocations,
              [MapLayer.SafePlaces]: safePlaceLocations,
              [MapLayer.Teleteyit]: teleteyitLocations,
              [MapLayer.Markers]:
                channelFilter === "twitter"
                  ? twitterLocations
                  : channelFilter === "babala"
                  ? babalaLocations
                  : twitterLocations.concat(babalaLocations),
            }}
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
        {channel && (
          <NewDrawer data={channel} onCopyBillboard={(_clipped) => {}} />
        )}

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

  let itemDetail: APIResponse | null = null;
  if (context.query.id) {
    itemDetail = await getLocationById(context.query.id);
  }

  let channel: ChannelData | undefined = undefined;
  if (itemDetail) {
    channel = parseChannelData(itemDetail, {
      transformResponse:
        transformers[itemDetail.channel.toLowerCase() as APIChannel],
    });
  }

  console.log({ itemDetail }, { channel });

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "home"])),
      deviceType: isMobile ? "mobile" : "desktop",
      singleItemDetail: {
        ...itemDetail,
        ...context.query,
      },
      channel: channel ?? null,
    },
  };
}
