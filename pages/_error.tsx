import styles from "@/styles/Home.module.css";
import { NextPage } from "next";
import { ErrorProps } from "next/error";
import NextErrorComponent from "next/error";
import Image from "next/image";
import Link from "next/link";

interface CustomErrorPageProps extends ErrorProps {
  detail?: string;
}

const CustomErrorPage: NextPage<CustomErrorPageProps> = ({ title, detail }) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <Image
          src="/images/maintenance.svg"
          alt="error"
          loading="eager"
          width={500}
          height={300}
          className={styles.errorImage}
        />
        <h1 className={styles.errorTitle}>{title ?? "Hata"}</h1>
        <p className={styles.errorText}>
          {detail ?? "Teknik hatayla karşılaşıldı, lütfen tekrar deneyin."}
        </p>
        <Link href="https://afetharita.com">
          <span className={styles.errorLink}>Anasayfaya Dön</span>
        </Link>
        <Link href="https://depremyardim.com">
          <span className={styles.errorLink}>DepremYardim.com</span>
        </Link>
      </div>
    </div>
  );
};

CustomErrorPage.getInitialProps = async (contextData) => {
  return NextErrorComponent.getInitialProps(contextData);
};

export default CustomErrorPage;
