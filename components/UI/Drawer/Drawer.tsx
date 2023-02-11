import useDisableZoom from "@/hooks/useDisableZoom";
import { useMapClickHandlers } from "@/hooks/useMapClickHandlers";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useDrawerData, useIsDrawerOpen } from "@/stores/mapStore";
import { Snackbar } from "@mui/material";
import { default as MuiDrawer } from "@mui/material/Drawer";
import {
  memo,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./Drawer.module.css";
import { useUrlPath } from "@/hooks/useUrlPath";
import { useRouter } from "next/router";
import { Content } from "./components/Content";
import { LayerContent } from "./components/LayerContent";

const Drawer = () => {
  useDisableZoom();
  const isOpen = useIsDrawerOpen();
  const drawerData = useDrawerData();
  const router = useRouter();
  const { setUrlQuery } = useUrlPath();
  const size = useWindowSize();
  const [openBillboardSnackbar, setOpenBillboardSnackbar] = useState(false);
  const anchor = useMemo(
    () => (size.width > 768 ? "left" : "bottom"),
    [size.width]
  );

  function copyBillboard(url: string) {
    navigator.clipboard.writeText(url);
    setOpenBillboardSnackbar(true);
  }

  const { handleMarkerClick: toggler } = useMapClickHandlers();

  useEffect(() => {
    if (isOpen && router && drawerData) {
      const path = setUrlQuery({ id: drawerData?.reference }, router);
      const query = path;
      router.push({ query }, { query }, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = useCallback(
    (e: MouseEvent) => {
      toggler(e);
    },
    [toggler]
  );

  return (
    <div>
      <Snackbar
        open={openBillboardSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenBillboardSnackbar(false)}
        message="Adres Kopyalandı"
      />
      <MuiDrawer
        className={styles.drawer}
        anchor={anchor}
        open={isOpen}
        onClose={handleClose}
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
