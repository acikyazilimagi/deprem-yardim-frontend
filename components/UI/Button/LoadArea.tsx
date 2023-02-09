import styles from "@/styles/Home.module.css";

export interface LoadAreaProps {
  remainingTime: number;
}

export const LoadArea = ({ remainingTime }: LoadAreaProps) => {
  return (
    <div className={styles.loadArea}>
      Alanı Tara
      <div className={styles.autoScanInfoTextSpinner}></div>
      <div className={styles.autoScanInfoText}>{remainingTime}</div>
    </div>
  );
};
