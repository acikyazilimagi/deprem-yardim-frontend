import useDisableZoom from "@/hooks/useDisableZoom";
import { useMapClickHandlers } from "@/hooks/useMapClickHandlers";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useDrawerData, useIsDrawerOpen } from "@/stores/mapStore";
import { default as MuiDrawer } from "@mui/material/Drawer";
import { memo, MouseEvent, useCallback, useEffect, useMemo } from "react";
import styles from "./Drawer.module.css";
import { useUrlPath } from "@/hooks/useUrlPath";
import { useRouter } from "next/router";
import { Content } from "./components/Content";
import { LayerContent } from "./components/LayerContent";
import { useTranslation } from "next-i18next";
import { useSnackbar } from "@/components/base/Snackbar";

const Drawer = () => {
  useDisableZoom();
  const isOpen = useIsDrawerOpen();
  const drawerData = useDrawerData();
  const router = useRouter();
  const { setUrlQuery } = useUrlPath();
  const size = useWindowSize();
  const anchor = useMemo(
    () => (size.width > 768 ? "left" : "bottom"),
    [size.width]
  );
  const { t } = useTranslation("home");
  const { enqueueInfo } = useSnackbar();

  function copyBillboard(url: string) {
    navigator.clipboard.writeText(url);
    enqueueInfo(t("cluster.copiedMapLinkSuccessfully"));
  }

  const { handleMarkerClick: toggler } = useMapClickHandlers();

  useEffect(() => {
    if (!isOpen) {
      router.replace(router.pathname, undefined, {});
    } else if (isOpen && router && drawerData) {
      const path = setUrlQuery({ id: drawerData?.reference }, router);
      const query = path;
      router.push({ query }, { query }, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, drawerData]);

  const handleClose = useCallback(
    (e: MouseEvent) => {
      toggler(e);
    },
    [toggler]
  );

  return (
    <div>
      <MuiDrawer
        className={styles.drawer}
        anchor={anchor}
        open={isOpen}
        onClose={handleClose}
        data-is-layer-drawer={!drawerData}
      >
        {!!drawerData && (
          <Content drawerData={drawerData} onCopyBillboard={copyBillboard} />
        )}
        {!drawerData && <LayerContent />}
      </MuiDrawer>
    </div>
  );
};

export default memo(Drawer);
