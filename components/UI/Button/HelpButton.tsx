import Link from "next/link";

import styles from "@/styles/Home.module.css";
import { Campaign } from "@mui/icons-material";
import { memo } from "react";

const _HelpButton = () => {
  return (
    <div className={styles.helpButtonContainer}>
      <Link
        href="https://www.depremyardim.com/"
        target="_blank"
        className={styles.logo}
      >
        <div className={styles.logoWrapper}>
          <Campaign sx={{ color: "white" }} />
        </div>
      </Link>
      YARDIM BUTONU
    </div>
  );
};

export const HelpButton = memo(_HelpButton);
