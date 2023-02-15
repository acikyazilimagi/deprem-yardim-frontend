import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import LoadingSpinner from "@/components/UI/Common/LoadingSpinner";
import { useTranslation } from "next-i18next";

import { useGetAreas } from "@/hooks/useGetAreas";

const ScanAreaButton = () => {
  const { t } = useTranslation(["home"]);
  const { setSendRequest, slowLoading, isLoading, isValidating } =
    useGetAreas();

  const handleScanButtonClick = useCallback(() => {
    setSendRequest(true);
  }, [setSendRequest]);

  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        onClick={handleScanButtonClick}
      >
        {isLoading || isValidating ? (
          <LoadingSpinner slowLoading={slowLoading} />
        ) : (
          <span>{t("scanner.text")}</span>
        )}
      </Button>
    </>
  );
};

export default ScanAreaButton;
