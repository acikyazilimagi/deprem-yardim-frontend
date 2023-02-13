import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const GenericError = () => {
  return (
    <Box
      sx={{
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">
        Teknik bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz.
      </Typography>
    </Box>
  );
};

export default GenericError;
