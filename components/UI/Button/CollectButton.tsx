import Link from "next/link";

import styles from "@/styles/Home.module.css";
import { Campaign } from "@mui/icons-material";
import { memo } from "react";

const _CollectButton = () => {
  return (
    <div className={styles.collectButtonContainer}>
      <Link
        href="https://www.turkiye.gov.tr/afet-ve-acil-durum-yonetimi-acil-toplanma-alani-sorgulama"
        target="_blank"
        className={styles.logo}
      >
        <div className={styles.logoWrapper}>
          <Campaign sx={{ color: "transparent" }} />
        </div>
      </Link>
      TOPLANMA ALANLARI
    </div>
  );
};

export const CollectButton = memo(_CollectButton);
