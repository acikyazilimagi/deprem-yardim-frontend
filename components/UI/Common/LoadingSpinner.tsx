import styles from "./LoadingSpinner.module.css";
import { useTranslation } from "next-i18next";

type LoadingProps = {
  slowLoading: boolean;
};

const RenderLoadingSpinner = ({ slowLoading }: LoadingProps) => {
  const { t } = useTranslation("common");
  return (
    <div className={styles.spinnerLoaderBox}>
      <div className={styles.spinnerLoaderText}>
        {slowLoading
          ? t("loaders.stillLoading").toString()
          : t("loaders.loading").toString()}
      </div>
      <div className={styles.spinnerLoader}></div>
    </div>
  );
};

export default RenderLoadingSpinner;
