import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/Home.module.css";
import { memo } from "react";

const _Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <Link
        href="https://www.depremyardim.com/"
        target="_blank"
        className={styles.logo}
      >
        <div className={styles.logoWrapper}>
          {/* <p>Yardım İstemek İçin Tıkla</p> */}
          <Image src="/logo.svg" width={64} height={64} alt="Afet Haritası" />
        </div>
      </Link>
    </div>
  );
};

export const Logo = memo(_Logo);
