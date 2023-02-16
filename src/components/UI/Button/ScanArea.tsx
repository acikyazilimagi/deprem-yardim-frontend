import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import LoadingSpinner from "@/components/UI/Common/LoadingSpinner";
import { useTranslation } from "next-i18next";
import { Box } from "@mui/material";
import { useGetAreas } from "@/hooks/useGetAreas";

const ScanAreaButton = () => {
  const { t } = useTranslation(["home"]);
  const { setSendRequest, slowLoading, isLoading, isValidating } =
    useGetAreas();

  const handleScanButtonClick = useCallback(() => {
    setSendRequest(true);
  }, [setSendRequest]);

  return (
    <Box
      sx={{
        top: { md: "15px" },
        bottom: { xs: "88px", md: "unset" },
        position: "fixed",
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
        color="primary"
        variant="contained"
        onClick={handleScanButtonClick}
      >
        {isLoading || isValidating ? (
          <LoadingSpinner slowLoading={slowLoading} />
        ) : (
          <span>{t("scanner.text")}</span>
        )}
      </Button>
    </Box>
  );
};

export default ScanAreaButton;
