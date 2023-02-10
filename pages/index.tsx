import ClusterPopup from "@/components/UI/ClusterPopup";
import LoadingSpinner from "@/components/UI/Common/LoadingSpinner";
import RenderIf from "@/components/UI/Common/RenderIf";
import Drawer from "@/components/UI/Drawer/Drawer";
import FooterBanner from "@/components/UI/FooterBanner/FooterBanner";
import SitesIcon from "@/components/UI/SitesIcon/Icons";
import { MaintenanceError } from "@/errors";
import { DeviceType } from "@/mocks/types";
import { dataFetcher } from "@/services/dataFetcher";
import {
  useMapActions,
  setMarkerData,
  useDevice,
  useMapStore,
} from "@/stores/mapStore";
import styles from "@/styles/Home.module.css";
import { REQUEST_THROTTLING_INITIAL_SEC } from "@/utils/constants";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import dynamic from "next/dynamic";
import Footer from "@/components/UI/Footer/Footer";
import useIncrementalThrottling from "@/hooks/useIncrementalThrottling";
import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { dataTransformerLite } from "@/utils/dataTransformer";
import { locationsURL } from "@/utils/urls";
import HeadWithMeta from "@/components/base/HeadWithMeta/HeadWithMeta";
import FilterMenu from "@/components/UI/FilterMenu/FilterMenu";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation, Trans } from "next-i18next";
import { useRouter } from "next/router";
import LocaleSwitch from "@/components/UI/I18n/LocaleSwitch";
import { useURLActions, useURLStore } from "@/stores/urlStore";

const LeafletMap = dynamic(() => import("@/components/UI/Map"), {
  ssr: false,
});

type Props = {
  deviceType: DeviceType;
  singleItemDetail: any;
};
export default function Home({ deviceType, singleItemDetail }: Props) {
  const { t } = useTranslation(["common", "home"]);
  const router = useRouter();
  const [sendRequest, setSendRequest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newerThanTimestamp, setNewerThanTimestamp] = useState<
    number | undefined
  >(undefined);
  const device = useDevice();
  const isMobile = device === "mobile";
  const { eventType } = useMapStore();
  const { url } = useURLStore();
  const { setReasoningFilterMenuOption } = useURLActions();

  const { setDevice } = useMapActions();

  useEffect(() => {
    setDevice(deviceType);
  }, [deviceType, setDevice]);

  const getData = useCallback(async () => {
    if (!sendRequest || !url.search) return;
    setSendRequest(false);
    setIsLoading(true);

    try {
      const data = await dataFetcher(url.href);
      const transformedData = data.results ? dataTransformerLite(data) : [];
      setMarkerData(transformedData);
    } catch (e) {
      setError(true);
      throw new MaintenanceError(t("common:errors.maintenance").toString());
    } finally {
      setIsLoading(false);
    }
  }, [sendRequest, t, url.href, url.search]);

  useEffect(() => {
    if (!sendRequest) return;

    getData();
  }, [getData, sendRequest]);

  const [remainingTime, resetThrottling] = useIncrementalThrottling(
    () => setSendRequest(true),
    REQUEST_THROTTLING_INITIAL_SEC
  );

  const handleScanButtonClick = useCallback(() => {
    setSendRequest(true);

    resetThrottling();
  }, [resetThrottling]);

  useEffect(() => {
    if (eventType === "moveend" || eventType === "zoomend") {
      resetThrottling();
      return;
    }

    setSendRequest(true);
  }, [eventType, resetThrottling, url]);

  useEffect(() => {
    setSendRequest(true);
  }, [newerThanTimestamp]);

  const onLanguageChange = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

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
                  <FilterMenu.Reasoning
                    onChange={setReasoningFilterMenuOption}
                  />
                  <FilterMenu.Time onChangeTime={setNewerThanTimestamp} />
                </FilterMenu>
              </div>
            </div>
            <LeafletMap />
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
                {isLoading ? (
                  <LoadingSpinner slowLoading={false} />
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

  let itemDetail = {};
  if (context.query.id) {
    const url = locationsURL(context.query.id) as string;
    itemDetail = await dataFetcher(url);
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "home"])),
      deviceType: isMobile ? "mobile" : "desktop",
      singleItemDetail: context.query.id
        ? { ...itemDetail, ...context.query }
        : {},
    },
  };
}
