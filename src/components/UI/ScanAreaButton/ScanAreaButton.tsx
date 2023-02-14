import React from "react";
import Button from "@mui/material/Button";
import LoadingSpinner from "@/components/UI/Common/LoadingSpinner";
import { useTranslation, Trans } from "next-i18next";

import styles from "@/styles/Home.module.css";
import { useGetAreas } from "@/hooks/useGetAreas";

interface Props {
  handleScanButtonClick: () => void;
  isLoading: boolean;
  isValidating: boolean;
  slowLoading: boolean;
}

const ScanAreaButton = ({
  isLoading,
  isValidating,
  slowLoading,
  handleScanButtonClick,
}: Props) => {
  const { remainingTime } = useGetAreas();
  const { t } = useTranslation(["home"]);

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
