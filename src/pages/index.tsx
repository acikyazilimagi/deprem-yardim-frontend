import { useEffect } from "react";
import ClusterPopup from "@/components/UI/ClusterPopup";
import RenderIf from "@/components/UI/Common/RenderIf";
import Drawer from "@/components/UI/Drawer/Drawer";
import FooterBanner from "@/components/UI/FooterBanner/FooterBanner";
import SitesIcon from "@/components/UI/SitesIcon/Icons";
import { MaintenanceError } from "@/errors";
import styles from "@/styles/Home.module.css";
import Container from "@mui/material/Container";
import dynamic from "next/dynamic";
import Footer from "@/components/UI/Footer/Footer";
import { Box } from "@mui/material";
import HeadWithMeta from "@/components/base/HeadWithMeta/HeadWithMeta";
import FilterMenu from "@/components/UI/FilterMenu/FilterMenu";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import LocaleSwitch from "@/components/UI/I18n/LocaleSwitch";
import { useURLActions } from "@/stores/urlStore";
import { useVerifiedLocations } from "@/hooks/useVerifiedLocations";
import ScanAreaButton from "@/components/UI/ScanAreaButton/ScanAreaButton";
import { useErrors } from "@/stores/errorStore";
import { useSnackbar } from "@/components/base/Snackbar";
import { CHANNEL_COUNT } from "@/utils/constants";
import {
  useAreasActions,
  useAreasStoreError,
  useShouldFetchNextOption,
} from "@/stores/areasStore";
import { getLocationById } from "@/services/location";
import { useDevice } from "@/hooks/useDevice";

const LeafletMap = dynamic(() => import("@/components/UI/Map"), {
  ssr: false,
});

type Props = {
  singleItemDetail: any;
  ahbap: any[];
};

export default function Home({ singleItemDetail }: Props) {
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

  const onLanguageChange = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  const handleContextMenu = (e: any) => {
    e.preventDefault();
  };

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
  const itemDetail = await getLocationById(context.query.id);

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "home"])),
      ahbap: [],
      singleItemDetail: {
        ...itemDetail,
        ...context.query,
      },
    },
  };
}
