import styles from "@/styles/Home.module.css";
import { NextPage } from "next";
import { ErrorProps } from "next/error";
import Image from "next/image";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

interface CustomErrorPageProps extends ErrorProps {
  detail?: string;
}

const CustomErrorPage: NextPage<CustomErrorPageProps> = ({ title, detail }) => {
  const { t } = useTranslation("error");
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
        <h1 className={styles.errorTitle}>
          {title ?? t("defaults.title").toString()}
        </h1>
        <p className={styles.errorText}>
          {detail ?? t("defaults.detail").toString()}
        </p>
        <Link href="https://afetharita.com">
          <span className={styles.errorLink}>{t("returnHome")}</span>
        </Link>
        <Link href="https://depremyardim.com">
          <span className={styles.errorLink}>DepremYardim.com</span>
        </Link>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["error"])),
    },
  };
}

export default CustomErrorPage;
