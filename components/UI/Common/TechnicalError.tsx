import React from "react";
import styles from "./TechnicalError.module.css";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

const TechnicalError = () => {
  return (
    <div className={styles.technicalErrorWrapper}>
      <div className={styles.technicalErrorParaContainer}>
        <ErrorOutlineIcon className={styles.technicalErrorIcon} />
        <p className={styles.technicalErrorPara}>Teknik bir sorun yaşandı</p>
        <p className={styles.technicalErrorPara}>
          <FormattedMessage id="label.pleaseTyrAMomentLater" />
        </p>
        <Link href="/" className={styles.technicalErrorLink}>
          <p>
            <FormattedMessage id="label.tryAgain" />
          </p>
        </Link>
      </div>
    </div>
  );
};

export default TechnicalError;
