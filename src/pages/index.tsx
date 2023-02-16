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
import { useDevice, useMapActions } from "@/stores/mapStore";
import { useURLActions } from "@/stores/urlStore";
import styles from "@/styles/Home.module.css";
import { DeviceType } from "@/types";
import { CHANNEL_COUNT } from "@/utils/constants";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import { useTranslation } from "next-i18next";
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
  const { t } = useTranslation(["common", "home"]);
  const { setTimeStamp } = useURLActions();
  const router = useRouter();
  const device = useDevice();

  const areasError = useAreasStoreError();

  const { setShouldFetchNextOption } = useAreasActions();
  const resetShouldFetchNextOption = () => setShouldFetchNextOption(false);
  const shouldFetchNextOption = useShouldFetchNextOption();

  const isMobile = device === "mobile";

  const verifiedLocationErrors = useErrors();
  const { enqueueWarning } = useSnackbar();
  const error = areasError && false;

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
      throw new MaintenanceError(t("common:errors.maintenance").toString());
    }
  }, [areasError, verifiedLocationErrors, t]);

  const { setDevice } = useMapActions();

  useEffect(() => {
    setDevice(deviceType);
  }, [deviceType, setDevice]);

  const onLanguageChange = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  const handleContextMenu = (e: any) => e.preventDefault();

  return (
    <>
      <HeadWithMeta singleItemDetail={singleItemDetail} />
      <main className={styles.main} onContextMenu={handleContextMenu}>
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
