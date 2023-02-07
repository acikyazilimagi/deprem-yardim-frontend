import React from "react";
import styles from "./LoadingSpinner.module.css";

const RenderLoadingSpinner = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinnerLoaderBox}>
        <div className={styles.spinnerLoader}></div>
        <div className={styles.spinnerLoaderText}>Yükleniyor...</div>
      </div>
    </div>
  );
};

export default RenderLoadingSpinner;
