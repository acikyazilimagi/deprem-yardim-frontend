import { Button, LinearProgress, SxProps, Theme } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "next-i18next";
import { ChannelData } from "@/types";
import { useMap } from "react-leaflet";
import { useRouter } from "next/router";
import { getFetchAreaBounds } from "@/utils/getFetchAreaBounds";
import { useSingletonsStore } from "@/stores/singletonsStore";
import { devtools } from "zustand/middleware";
import { create } from "zustand";

interface IStyles {
  [key: string]: SxProps<Theme>;
}

type Props = {
  setLocations: Dispatch<SetStateAction<ChannelData[]>>;
};

interface IUseLoading {
  loading: boolean;
  showLoading: (_state: boolean) => void;
}

export const useLoading = create<IUseLoading>()(
  devtools(
    (set) => ({
      loading: false,
      showLoading: (state: boolean) =>
        set(() => ({ loading: state }), undefined, { type: "showLoading" }),
    }),
    { name: "LoadingStore" }
  )
);

export const CooldownButtonComponent = ({ setLocations }: Props) => {
  const { t } = useTranslation("home");
  const { loading } = useLoading();

  const map = useMap();
  const router = useRouter();
  const { apiClient } = useSingletonsStore();
  const onScanClick = () => {
    const reasons = router.query.reasons as string;
    const bound = getFetchAreaBounds(map.getBounds());
    apiClient.fetchAreas({ reasons, bound }).then(setLocations);
  };

  return (
    <Button sx={styles.button} variant="contained" onClick={onScanClick}>
      {t("scanner.text")}
      {loading ? <LinearProgress sx={styles.progress} /> : null}
    </Button>
  );
};

const styles: IStyles = {
  button: () => ({
    pointerEvents: "all",
    height: "48px",
    width: "200px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px !important",
  }),
  progress: () => ({
    height: "4px",
    width: "100%",
    marginTop: 0.5,
    marginBottom: 0,
  }),
};
