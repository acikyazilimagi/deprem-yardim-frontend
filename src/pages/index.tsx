import dynamic from "next/dynamic";
import { Box, SxProps, Theme } from "@mui/material";
import { HelpViewComponent } from "@/components/UserGuide/UserGuide";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { HeadWithMeta } from "@/components/HeadWithMeta/HeadWithMeta";

const MapContent = dynamic(
  () => import("@/components/Map/Content").then((mod) => mod.MapContent),
  { ssr: false }
);

const Drawer = dynamic(
  () => import("@/components/Drawer/NewDrawer").then((mod) => mod.Drawer),
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

const NHome = () => {
  const { copyToClipBoard } = useCopyToClipboard();

  return (
    <>
      <HeadWithMeta />
      <main id="new-layout">
        <UIElementsOverlay />
        <MapContent />
        <Drawer
          data={null}
          onCopyBillboard={(_clipped) => copyToClipBoard(_clipped as string)}
        />
      </main>
    </>
  );
};

export default NHome;

export async function getServerSideProps(context: any) {
  const searchParams = new URLSearchParams(context.query);
  let redirect = false;

  // Pass data to the page via props
  const UA = context.req.headers["user-agent"];
  const isMobile = Boolean(
    UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  if (redirect) {
    return {
      redirect: {
        permanent: false,
        destination: "/?" + searchParams.toString(),
      },
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "home"])),
      deviceType: isMobile ? "mobile" : "desktop",
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
    top: "10px",
    left: "60px",
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
