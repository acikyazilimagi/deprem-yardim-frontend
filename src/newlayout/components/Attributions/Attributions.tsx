import { useTranslation } from "next-i18next";
import styles from "./Attribution.module.css";

interface AttributionComponentProps {
  onClick?: () => void;
}

export function AttributionComponent(props: AttributionComponentProps) {
  const { t } = useTranslation("common");
  return (
    <div className={styles.attribution}>
      <a href="./cerez.pdf" target="_blank">
        {t("footer.politic.cookie")}
      </a>
      •
      <a href="./gizlilik.pdf" target="_blank">
        {t("footer.politic.privacy")}
      </a>
      •
      <a href="#" onClick={props.onClick}>
        {t("footer.politic.data")}
      </a>
      •<a href="https://maps.google.com/">GMaps</a>•
      <a href="https://leafletjs.com/">Leaflet</a>
    </div>
  );
}
