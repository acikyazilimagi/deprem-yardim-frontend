import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const ScanAreaButton = () => {
  const { t } = useTranslation(["home"]);
  const router = useRouter();

  const handleScanButtonClick = useCallback(() => {
    const query = router.query;
    router.push({ query }, { query });
  }, [router]);

  return (
    <Button color="primary" variant="contained" onClick={handleScanButtonClick}>
      <span>{t("scanner.text")}</span>
    </Button>
  );
};

export default ScanAreaButton;
