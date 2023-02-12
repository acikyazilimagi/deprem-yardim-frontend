import styles from "./Footer.module.css";
import { useTranslation } from "next-i18next";
interface Props {
  setHideFooter: (_hideFooter: boolean) => void;
}

export default function Footer({ setHideFooter }: Props) {
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
      <li
        style={{
          cursor: "pointer",
        }}
        onClick={() => setHideFooter(false)}
      >
        <a>{t("footer.politic.data")}</a>
      </li>
    </ul>
  );
}
