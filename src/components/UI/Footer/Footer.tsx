import { useSetIsFooterBannerOpen } from "@/stores/commonStore";
import styles from "./Footer.module.css";
import { useTranslation } from "next-i18next";

export default function Footer() {
  const setIsFooterBannerOpen = useSetIsFooterBannerOpen();

  const { t } = useTranslation("common");
  return (
    <ul className={styles.footer}>
      <li>
        <a href="./cerez.pdf" target="_blank">
          {t("footer.politic.cookie")}
        </a>
      </li>
      <li>
        <a href="./gizlilik.pdf" target="_blank">
          {t("footer.politic.privacy")}
        </a>
      </li>
      <li onClick={() => setIsFooterBannerOpen(true)}>
        <a>{t("footer.politic.data")}</a>
      </li>
    </ul>
  );
}
