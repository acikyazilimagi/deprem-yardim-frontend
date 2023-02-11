import styles from "./Footer.module.css";
import { useTranslation } from "next-i18next";
import { useDevice } from "@/stores/mapStore";

export default function Footer() {
  const { t } = useTranslation("common");
  const isMobile = useDevice() === "mobile";
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

      {isMobile && (
        <>
          <li>
            <a href="https://deprem.io/" target="_blank" rel="noreferrer">
              Deprem.io
            </a>
          </li>
          <li>
            <a href="https://beniyiyim.com/" target="_blank" rel="noreferrer">
              beniyiyim
            </a>
          </li>
        </>
      )}
    </ul>
  );
}
