import dynamic from "next/dynamic";
import { Box, SxProps, Theme } from "@mui/material";
import { Drawer } from "@/components/UI/Drawer/NewDrawer";
import { HelpViewComponent } from "@/newlayout/components/HelpViewComponent/HelpViewComponent";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ApiClient } from "@/services/ApiClient";
import { ChannelData } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { usePrevious } from "@/hooks/usePrevious";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

const MapContent = dynamic(
  () =>
    import("@/newlayout/components/map/MapContent").then(
      (mod) => mod.MapContent
    ),
  { ssr: false }
);
// Development overlay container
const UIElementsOverlay = () => {
  return (
    <Box sx={styles.overlay}>
      <HelpViewComponent />
    </Box>
  );
};

interface INHome {
  reasons: string[];
  channel: ChannelData;
}

const useApiClient = () =>
  useMemo(() => new ApiClient({ url: "https://apigo.afetharita.com" }), []);

const NHome = (props: INHome) => {
  const router = useRouter();
  const { copyToClipBoard } = useCopyToClipboard();

  const apiClient = useApiClient();
  const [reasons] = useState(() => props.reasons);
  const [locations, setLocations] = useState<ChannelData[]>(() => []);

  const prevReasons = usePrevious(router.query.reasons);

  useEffect(() => {
    if (router.query.reasons && prevReasons !== router.query.reasons) {
      apiClient
        .fetchAreas({ reasons: router.query.reasons as string })
        .then(setLocations);
    }
  }, [apiClient, prevReasons, router.query.reasons]);

  return (
    <main id="new-layout">
      <UIElementsOverlay />
      <MapContent reasons={reasons} locations={locations} />
      {props.channel && (
        <Drawer
          data={props.channel}
          onCopyBillboard={(_clipped) => copyToClipBoard(_clipped as string)}
        />
      )}
    </main>
  );
};
export default NHome;

export async function getServerSideProps(context: any) {
  const client = new ApiClient({ url: "https://apigo.afetharita.com" });
  const reasons = await client.fetchReasons();

  let channel: ChannelData | null = null;
  if (context.query.id) {
    channel = await client.fetchLocationByID(context.query.id);
  }

  // Pass data to the page via props
  const UA = context.req.headers["user-agent"];
  const isMobile = Boolean(
    UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "home"])),
      deviceType: isMobile ? "mobile" : "desktop",
      reasons,
      channel,
    },
  };
}

interface IStyles {
  [key: string]: SxProps<Theme>;
}

const styles: IStyles = {
  overlay: (theme: Theme) => ({
    display: "flex",
    position: "fixed",
    flexDirection: "column",
    top: "85px",
    left: "55px",
    zIndex: 1100,
    pointerEvents: "none",
    [theme.breakpoints.down("sm")]: {
      top: "0px",
      left: "0px",
    },
  }),
  fixedMidBottom: () => ({
    position: "fixed",
    bottom: "0px",
    left: "0px",
    width: "100%",
    height: "110px",
    zIndex: 1030,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none",
  }),
};
