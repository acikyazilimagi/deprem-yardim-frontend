import Image from "next/image";
import Link from "next/link";
import styles from "./Maintenance.module.css";

const maintenance = () => {
  return (
    <div className={styles.maintenanceContainer}>
      <div className={styles.maintenanceContent}>
        <Image
          src="/images/maintenance.svg"
          alt="maintenance"
          loading="eager"
          width={500}
          height={300}
          className={styles.maintenanceImage}
        />
        <h1 className={styles.maintenanceTitle}>Bakımdayız.</h1>
        <p className={styles.maintenanceText}>
          Bu sayfa sizlere daha iyi hizmet verebilmek için bakımdadır.
          <br /> Lütfen daha sonra tekrar deneyin veya DepremYardim.com&apos;u
          ziyaret edin.
        </p>
        <Link href="https://depremyardim.com">
          <span className={styles.maintenanceLink}>DepremYardim.com</span>
        </Link>
      </div>
    </div>
  );
};

export default maintenance;
