import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import LoadingSpinner from "@/components/UI/Common/LoadingSpinner";
import { useTranslation, Trans } from "next-i18next";

import styles from "@/styles/Home.module.css";
import { useGetAreas } from "@/hooks/useGetAreas";

const ScanAreaButton = () => {
  const { t } = useTranslation(["home"]);
  const {
    remainingTime,
    resetThrottling,
    setSendRequest,
    slowLoading,
    isLoading,
    isValidating,
  } = useGetAreas();

  const handleScanButtonClick = useCallback(() => {
    setSendRequest(true);

    resetThrottling();
  }, [resetThrottling, setSendRequest]);

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
      <small className={styles.autoScanInfoTextIndex}>
        <Trans
          i18nKey="home:scanner.remaining"
          values={{ time: remainingTime }}
        />
      </small>
    </>
  );
};

export default ScanAreaButton;
