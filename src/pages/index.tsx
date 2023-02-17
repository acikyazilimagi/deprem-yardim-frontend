import HeadWithMeta from "@/components/base/HeadWithMeta/HeadWithMeta";
import { useSnackbar } from "@/components/base/Snackbar";
import ClusterPopup from "@/components/UI/ClusterPopup";
import RenderIf from "@/components/UI/Common/RenderIf";
import Drawer from "@/components/UI/Drawer/Drawer";
import FilterMenu from "@/components/UI/FilterMenu/FilterMenu";
import Footer from "@/components/UI/Footer/Footer";
import FooterBanner from "@/components/UI/Footer/Banner";
import LocaleSwitch from "@/components/UI/I18n/LocaleSwitch";
import ScanAreaButton from "@/components/UI/Button/ScanArea";
import SitesIcon from "@/components/UI/SitesIcon/Icons";
import { MaintenanceError } from "@/errors";
import { useVerifiedLocations } from "@/hooks/useVerifiedLocations";
import { getLocationById } from "@/services/location";
import {
  useAreasActions,
  useAreasStoreError,
  useShouldFetchNextOption,
} from "@/stores/areasStore";
import { useErrors } from "@/stores/errorStore";
import { MapLayer, useDevice, useMapActions } from "@/stores/mapStore";
import { useURLActions } from "@/stores/urlStore";
import styles from "@/styles/Home.module.css";
import { APIResponse, DeviceType } from "@/types";
import { CHANNEL_COUNT } from "@/utils/constants";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { parseChannelData } from "@/hooks/useLocation";

const LeafletMap = dynamic(() => import("@/components/UI/Map"), {
  ssr: false,
});

type Props = {
  deviceType: DeviceType;
  singleItemDetail: APIResponse;
};

export default function Home({ deviceType, singleItemDetail }: Props) {
  console.log(">>>>", singleItemDetail);

  // gather location data from all channels
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

  const router = useRouter();
  const { toggleDrawer, setDrawerData, setEventType } = useMapActions();

  // useEffect(() => {
  //   if (singleItemDetail.channel) {
  //     const channelData = parseChannelData(singleItemDetail, {
  //       transformResponse: (res) => {
  //         console.log({ res, singleItemDetail });
  //         if (
  //           res.channel.toLowerCase() === "twitter" ||
  //           res.channel.toLowerCase() === "babala"
  //         ) {
  //           return {
  //             channel: "twitter",
  //             geometry: {
  //               location: {
  //                 lat: 0,
  //                 lng: 0,
  //               },
  //             },
  //             properties: {
  //               reference: res.extraParams.entry_id,
  //             },
  //           };
  //         }
  //
  //         return res;
  //       },
  //     });
  //
  //     setDrawerData(channelData);
  //   }
  // }, [setDrawerData, singleItemDetail]);

  // useEffect(() => {
  //   if (id && !isOpen) {
  //     const tempDrawerData = {
  //       channel: "generic",
  //       reference: Number(id as string),
  //       geometry: {
  //         location: {
  //           lat: parseFloat(lat as string),
  //           lng: parseFloat(lng as string),
  //         },
  //       },
  //       isVisited: false,
  //       properties: {},
  //     };
  //     toggleDrawer();
  //     setDrawerData(tempDrawerData as any);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // next-i8next multilanguage support
  const { t } = useTranslation(["common", "home"]);

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

  // error from fetching marker information
  const areasError = useAreasStoreError();

  // supposed to handle re-fetching after filter selection (FIXME: FilterTimeMenu.tsx)
  const { setShouldFetchNextOption } = useAreasActions();
  const resetShouldFetchNextOption = () => setShouldFetchNextOption(false);
  const shouldFetchNextOption = useShouldFetchNextOption();

  // global error handling from location data fetching
  const verifiedLocationErrors = useErrors();
  const [isInMaintenance, setIsMaintenance] = useState<boolean>(false);

  // to warn the user that there is partial data
  const { enqueueWarning } = useSnackbar();

  // FIXME: This is a temporary solution to show the warning. We should refactor this.
  useEffect(() => {
    const numErrors = Object.keys(verifiedLocationErrors).reduce(
      (accumulator: number, current: any) => {
        if (current) {
          return accumulator + 1;
        }
        return accumulator;
      },
      0
    );
    if (numErrors) {
      enqueueWarning(t("common:errors.partialData"));
    }
  }, [verifiedLocationErrors, enqueueWarning, t]);

  // FIXME: This is a temporary solution to show the warning. We should refactor this.
  useEffect(() => {
    const numErrors = Object.keys(verifiedLocationErrors).reduce(
      (accumulator: number, current: any) => {
        if (current) {
          return accumulator + 1;
        }
        return accumulator;
      },
      0
    );

    if (numErrors == CHANNEL_COUNT && areasError) {
      setIsMaintenance(true);
      throw new MaintenanceError(t("common:errors.maintenance").toString());
    }
  }, [areasError, verifiedLocationErrors, t, setIsMaintenance]);

  const handleContextMenu = (e: any) => e.preventDefault();

  return (
    <>
      <HeadWithMeta singleItemDetail={singleItemDetail} />
      <main className={styles.main} onContextMenu={handleContextMenu}>
        <Container maxWidth={false} disableGutters>
          <RenderIf condition={!isInMaintenance}>
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

  const itemDetail = await getLocationById(context.query.id);

  // const parsed = parseChannelData(data, {
  //   transformResponse: (res) => ({
  //     channel: res.channel.toLowerCase() as "twitter" | "babala",
  //     geometry: { location: { lat: 0, lng: 0 } },
  //     properties: {
  //       ...res,
  //       ...res.extraParams,
  //     },
  //     reference: res.entry_id,
  //   }),
  // }) as TwitterData | BabalaData;
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "home"])),
      deviceType: isMobile ? "mobile" : "desktop",
      singleItemDetail: {
        ...itemDetail,
        ...context.query,
      },
    },
  };
}
