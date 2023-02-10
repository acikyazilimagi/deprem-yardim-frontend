import styles from "./LoadingSpinner.module.css";

type LoadingProps = {
  slowLoading: boolean;
};

const RenderLoadingSpinner = ({ slowLoading }: LoadingProps) => {
  return (
    <div className={styles.spinnerLoaderBox}>
      <div className={styles.spinnerLoaderText}>
        {slowLoading ? "Hala yükleniyor..." : "Yükleniyor..."}
      </div>
      <div className={styles.spinnerLoader}></div>
    </div>
  );
};

export default RenderLoadingSpinner;
