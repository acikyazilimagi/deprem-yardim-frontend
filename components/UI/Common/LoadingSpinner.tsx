import React from "react";
import { FormattedMessage } from "react-intl";
import styles from "./LoadingSpinner.module.css";

type LoadingProps = {
  slowLoading: boolean;
};

const RenderLoadingSpinner = ({ slowLoading }: LoadingProps) => {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinnerLoaderBox}>
        <div className={styles.spinnerLoader}></div>
        <div className={styles.spinnerLoaderText}>
          {slowLoading ? (
            <FormattedMessage id="label.stillLoading" />
          ) : (
            <FormattedMessage id="label.loading" />
          )}
        </div>
      </div>
    </div>
  );
};

export default RenderLoadingSpinner;
