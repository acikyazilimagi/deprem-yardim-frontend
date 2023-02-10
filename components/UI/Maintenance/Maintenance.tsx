import Image from "next/image";
import Link from "next/link";
import styles from "./Maintenance.module.css";

export interface MaintenanceProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
}

const DEFAULT_TITLE = "Bakımdayız.";
const DEFAULT_TEXT = (
  <>
    Bu sayfa sizlere daha iyi hizmet verebilmek için bakımdadır.
    <br /> Lütfen daha sonra tekrar deneyin veya DepremYardim.com&apos;u ziyaret
    edin.
  </>
);

const Maintenance = ({ title, children }: MaintenanceProps) => {
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
        <h1 className={styles.maintenanceTitle}>{title ?? DEFAULT_TITLE}</h1>
        <p className={styles.maintenanceText}>{children ?? DEFAULT_TEXT}</p>
        <Link href="https://depremyardim.com">
          <span className={styles.maintenanceLink}>DepremYardim.com</span>
        </Link>
      </div>
    </div>
  );
};

export default Maintenance;
