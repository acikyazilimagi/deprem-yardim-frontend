import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/Home.module.css";

export const HelpButton = () => {
  return (
    <div className={styles.logoContainer}>
      <Link
        href="https://www.depremyardim.com/"
        target="_blank"
        className={styles.logo}
      >
        <div className={styles.logoWrapper}>
          <p>Yardım İstemek İçin Tıkla</p>
          <Image src="/logo.svg" width={64} height={64} alt="Afet Haritası" />
        </div>
      </Link>
    </div>
  );
};
