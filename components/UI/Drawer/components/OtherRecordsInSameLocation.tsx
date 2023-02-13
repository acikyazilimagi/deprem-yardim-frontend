import { MarkerData } from "@/mocks/types";
import { useMapActions } from "@/stores/mapStore";
import { Box, Button, Typography } from "@mui/material";
import { Trans, useTranslation } from "next-i18next";
import { AhbapData, SatelliteData, TeleteyitData } from "./types";

type Props = {
  drawerData: MarkerData | AhbapData | TeleteyitData | SatelliteData | null;
};

export const CloseByRecord = ({ drawerData }: Props) => {
  const { setDrawerData } = useMapActions();
  const { t } = useTranslation("home");
  if (
    !drawerData ||
    !("closeByRecords" in drawerData) ||
    !drawerData.closeByRecords ||
    drawerData.closeByRecords.length <= 1
  )
    return null;

    const stateUpdate = (reference: number) => {
        console.log(history.state);
        const url = new URL(window.location.href);
        url.searchParams.set("id", reference.toString());
        history.pushState(history.state, "", url.href);
    };
  const onClick = (reference: number) => () => {
      stateUpdate(reference);

      const tempDrawerData: MarkerData | AhbapData = {
      ...drawerData,
      isVisited: true,
      reference,
      closeByRecords: drawerData.closeByRecords,
    };
    setDrawerData(tempDrawerData);
  };
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: "bold",
          borderTop: "1px solid gray",
          marginTop: "1rem",
          paddingTop: "1rem",
        }}
      >
        {t("content.closeBy.title")}
      </Typography>
      <Typography>
        <Trans
          i18nKey="home:content.closeBy.details"
          components={{ b: <b /> }}
        />
      </Typography>
      {drawerData.closeByRecords.map((record) => (
        <Button
          variant={record === drawerData.reference ? "contained" : "outlined"}
          onClick={onClick(record)}
          size="small"
          sx={{ margin: ".5rem .5rem 0 0" }}
          key={record}
        >
          ID: {record}
        </Button>
      ))}
    </Box>
  );
};
