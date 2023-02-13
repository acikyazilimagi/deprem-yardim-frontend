import { useCallback, useEffect, useState } from "react";
import ClusterPopup from "@/components/UI/ClusterPopup";
import LoadingSpinner from "@/components/UI/Common/LoadingSpinner";
import RenderIf from "@/components/UI/Common/RenderIf";
import Drawer from "@/components/UI/Drawer/Drawer";
import FooterBanner from "@/components/UI/FooterBanner/FooterBanner";
import SitesIcon from "@/components/UI/SitesIcon/Icons";
import { MaintenanceError } from "@/errors";
import { DeviceType } from "@/mocks/types";
import { dataFetcher } from "@/services/dataFetcher";
import { useMapActions, useDevice } from "@/stores/mapStore";
import styles from "@/styles/Home.module.css";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import dynamic from "next/dynamic";
import Footer from "@/components/UI/Footer/Footer";
import { Box } from "@mui/material";
import HeadWithMeta from "@/components/base/HeadWithMeta/HeadWithMeta";
import FilterMenu from "@/components/UI/FilterMenu/FilterMenu";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation, Trans } from "next-i18next";
import { useRouter } from "next/router";
import LocaleSwitch from "@/components/UI/I18n/LocaleSwitch";
import { useURLActions } from "@/stores/urlStore";
import { useGetAreas } from "@/hooks/useGetAreas";
import { locationsURL } from "@/utils/urls";
import { useVerifiedLocations } from "@/hooks/useVerifiedLocations";

const LeafletMap = dynamic(() => import("@/components/UI/Map"), {
  ssr: false,
});

type Props = {
  deviceType: DeviceType;
  singleItemDetail: any;
  ahbap: any[];
};

export default function Home({ deviceType, singleItemDetail }: Props) {
  const [isFooterBannerOpen, setIsFooterBannerOpen] = useState<boolean>(false);
  const {
    ahbapLocations,
    hospitalLocations,
    foodLocations,
    teleteyitLocations,
    satelliteLocations,
    sahraKitchenLocations,
    pharmacyLocations,
    safeLocations,
    depremIhtiyacLocations,
  } = useVerifiedLocations();
  const { t } = useTranslation(["common", "home"]);
  const { setTimeStamp } = useURLActions();
  const router = useRouter();
  const device = useDevice();
  const {
    resetThrottling,
    remainingTime,
    setSendRequest,
    shouldFetchNextOption,
    slowLoading,
    resetShouldFetchNextOption,
    error,
    isLoading,
    isValidating,
  } = useGetAreas();

  const isMobile = device === "mobile";

  if (error) {
    throw new MaintenanceError(t("common:errors.maintenance").toString());
  }

  const { setDevice } = useMapActions();

  const handleScanButtonClick = useCallback(() => {
    setSendRequest(true);

    resetThrottling();
  }, [resetThrottling, setSendRequest]);

  useEffect(() => {
    setDevice(deviceType);
  }, [deviceType, setDevice]);

  const onLanguageChange = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  const handleToggleFooterBanner = useCallback(() => {
    setIsFooterBannerOpen(!isFooterBannerOpen);
  }, [isFooterBannerOpen]);

  return (
    <>
      <HeadWithMeta singleItemDetail={singleItemDetail} />
      <main className={styles.main}>
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
              locations={{
                ahbap: ahbapLocations,
                hospital: hospitalLocations,
                food: foodLocations,
                teleteyit: teleteyitLocations,
                uydu: satelliteLocations,
                sahra_mutfak: sahraKitchenLocations,
                pharmacy: pharmacyLocations,
                safe: safeLocations,
                deprem_ihtiyac: depremIhtiyacLocations,
              }}
            />
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
              <Button
                color="secondary"
                variant="contained"
                onClick={handleScanButtonClick}
              >
                {isLoading || isValidating ? (
                  <LoadingSpinner slowLoading={slowLoading} />
                ) : (
                  <span>{t("home:scanner.text")}</span>
                )}
              </Button>
              <small className={styles.autoScanInfoTextIndex}>
                <Trans
                  i18nKey="home:scanner.remaining"
                  values={{ time: remainingTime }}
                />
              </small>
            </Box>
          </RenderIf>
        </Container>
        <Drawer />
        <ClusterPopup />
        <FooterBanner
          open={isFooterBannerOpen}
          onClick={handleToggleFooterBanner}
        />
        <Footer onClick={handleToggleFooterBanner} />
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
      ...(await serverSideTranslations(context.locale, ["common", "home"])),
      deviceType: isMobile ? "mobile" : "desktop",
      ahbap: [],
      singleItemDetail: context.query.id
        ? { ...itemDetail, ...context.query }
        : {},
    },
  };
}
