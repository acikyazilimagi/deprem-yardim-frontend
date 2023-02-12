import { MarkerData } from "@/mocks/types";
import { useMapActions } from "@/stores/mapStore";
import { Box, Button, Typography } from "@mui/material";
import { AhbapData } from "./types";

type Props = {
  drawerData: MarkerData | AhbapData | null;
};

export const CloseByRecord = ({ drawerData }: Props) => {
  const { setDrawerData } = useMapActions();
  if (
    !drawerData ||
    !("closeByRecords" in drawerData) ||
    !drawerData.closeByRecords ||
    drawerData.closeByRecords.length <= 1
  )
    return null;
  const onClick = (reference: number) => () => {
    const tempDrawerData: MarkerData = {
      ...drawerData,
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
        Other records
      </Typography>
      <Typography>Below records have the same location</Typography>
      {drawerData.closeByRecords.map((record) => (
        <Button
          variant={record === drawerData.reference ? "contained" : "outlined"}
          onClick={onClick(record)}
          size="small"
          key={record}
        >
          ID: {record}
        </Button>
      ))}
    </Box>
  );
};
